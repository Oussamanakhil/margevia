'use strict';
const {test,afterEach}=require('node:test');
const assert=require('node:assert/strict');
const handler=require('../api/pilot.js');
const originalFetch=global.fetch;
const data={name:'Élodie Chen',email:'elodie@example.com',company:'Example Catering',team:'Operations',focus:'Supplier price differences',sites:'2–5 locations'};
function request(body=data,headers={}){return {method:'POST',headers:{origin:'https://margevia.solutions','content-type':'application/json','x-real-ip':'192.0.2.1',...headers},body};}
async function run(req){const res={headers:{},setHeader(k,v){this.headers[k]=v},status(code){this.code=code;return this},json(body){this.body=body;return this}};await handler(req,res);return res;}
afterEach(()=>{global.fetch=originalFetch;delete process.env.PILOT_WEBHOOK_URL;});
test('accepts international names and valid pilot selections',()=>assert.deepEqual(handler.validate(data).errors,{}));
test('rejects missing contacts, forged selections and header injection',()=>{const result=handler.validate({...data,name:'',email:'x@example.com\r\nBcc: victim@example.com',team:'admin'});assert.deepEqual(Object.keys(result.errors),['name','email','team']);});
test('availability remains closed without a delivery connection',async()=>{assert.equal((await run({method:'GET',headers:{}})).body.available,false);assert.equal((await run(request())).code,503);});
test('rejects cross-origin, malformed, oversized and honeypot requests',async()=>{
 assert.equal((await run(request(data,{origin:'https://attacker.example'}))).code,403);
 assert.equal((await run(request('{'))).code,400);
 assert.equal((await run(request(data,{'content-length':'9000'}))).code,413);
 assert.equal((await run(request({...data,website:'spam'}))).code,400);
 assert.equal((await run(request({...data,company:''}))).code,422);
});
test('requires provider acceptance, escapes content, suppresses repeated success',async()=>{
 process.env.PILOT_WEBHOOK_URL='https://hook.eu1.make.com/test';let calls=0;
 global.fetch=async(url,options)=>{calls++;const payload=JSON.parse(options.body);assert.ok(payload.content.includes('&lt;script&gt;'));assert.equal(payload.to,undefined);return {ok:true,json:async()=>({sent:true,messageId:'test-provider-id'})};};
 const req=request({...data,company:'<script>Example</script>'});assert.equal((await run(req)).body.sent,true);assert.equal((await run(req)).body.sent,true);assert.equal(calls,1);
});
test('a generic webhook 200 never becomes a delivery success',async()=>{
 process.env.PILOT_WEBHOOK_URL='https://hook.eu1.make.com/test';global.fetch=async()=>({ok:true,json:async()=>({accepted:true})});
 const req=request({...data,company:'Unconfirmed Example'});assert.equal((await run(req)).code,502);assert.equal((await run(req)).code,409);
});
test('rate limits repeated distinct attempts in one function instance',async()=>{
 process.env.PILOT_WEBHOOK_URL='https://hook.eu1.make.com/test';global.fetch=async()=>({ok:true,json:async()=>({sent:true,messageId:'test'})});
 for(let i=0;i<5;i++)assert.equal((await run(request({...data,company:'Rate test '+i},{'x-real-ip':'192.0.2.2'}))).code,200);
 const res=await run(request({...data,company:'Rate test 6'},{'x-real-ip':'192.0.2.2'}));assert.equal(res.code,429);assert.equal(res.headers['Retry-After'],'600');
});
