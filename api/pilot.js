'use strict';
const {createHash}=require('node:crypto');
const origins=new Set(['https://margevia.solutions','https://www.margevia.solutions','https://margevia.vercel.app']);
const teams=new Set(['Purchasing','Operations','Finance','Owner / management','Other']);
const focuses=new Set(['Supplier price differences','Invoiced vs delivered quantities','Outstanding supplier credits']);
const sites=new Set(['1 location','2–5 locations','6–10 locations','11+ locations']);
const recent=new Map();
const limits=new Map();
const WINDOW=10*60*1000;
const escapeHtml=value=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clean=(value,max)=>typeof value==='string'&&value.trim().length<=max&&!/[\u0000-\u001f\u007f]/.test(value)?value.trim():'';
function validate(body){
 const input=body&&typeof body==='object'&&!Array.isArray(body)?body:{};
 const data={name:clean(input.name,100),email:clean(input.email,254),company:clean(input.company,150),team:clean(input.team,50),focus:clean(input.focus,80),sites:clean(input.sites,30)};
 const errors={};
 if(!data.name)errors.name='Enter your name (up to 100 characters).';
 if(!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email))errors.email='Enter a valid email address.';
 if(!data.company)errors.company='Enter your company (up to 150 characters).';
 if(!teams.has(data.team))errors.team='Select your team.';
 if(!focuses.has(data.focus))errors.focus='Choose what you would check first.';
 if(!sites.has(data.sites))errors.sites='Choose the number of locations.';
 return {data,errors};
}
function reply(res,status,body){res.setHeader('Cache-Control','no-store');return res.status(status).json(body);}
function configured(){try{const url=new URL(process.env.PILOT_WEBHOOK_URL);return url.protocol==='https:'&&url.hostname==='hook.eu1.make.com';}catch{return false;}}
async function handler(req,res){
 if(req.method==='GET')return reply(res,200,{available:configured()});
 if(req.method!=='POST'){res.setHeader('Allow','GET, POST');return reply(res,405,{error:'Method not allowed.'});}
 if(!origins.has(req.headers.origin))return reply(res,403,{error:'Please send your brief from margevia.solutions.'});
 if(!String(req.headers['content-type']||'').startsWith('application/json'))return reply(res,415,{error:'Please use the pilot form.'});
 if(Number(req.headers['content-length'])>8192)return reply(res,413,{error:'The brief is too long.'});
 let body=req.body;
 if(typeof body==='string'){if(Buffer.byteLength(body)>8192)return reply(res,413,{error:'The brief is too long.'});try{body=JSON.parse(body);}catch{return reply(res,400,{error:'Please check the form and try again.'});}}
 if(!body||typeof body!=='object'||Array.isArray(body))return reply(res,400,{error:'Please check the form and try again.'});
 if(body.website)return reply(res,400,{error:'Unable to send this submission. Please contact support@margevia.solutions.'});
 const {data,errors}=validate(body);
 if(Object.keys(errors).length)return reply(res,422,{error:'Check the highlighted fields.',fields:errors});
 if(!configured())return reply(res,503,{error:'Brief delivery is temporarily unavailable. Please email support@margevia.solutions.'});
 const now=Date.now();
 for(const [key,value] of recent)if(value.expires<now)recent.delete(key);
 for(const [key,value] of limits)if(value.expires<now)limits.delete(key);
 const fingerprint=createHash('sha256').update(JSON.stringify(data)).digest('hex');
 if(recent.has(fingerprint)){
  const state=recent.get(fingerprint);
  return state.sent?reply(res,200,{sent:true}):reply(res,409,{error:'This brief may already be processing. Please wait before trying again.'});
 }
 // Best-effort per-instance protection. Configure Vercel Firewall for durable, cross-instance rate limits.
 const ip=String(req.headers['x-real-ip']||'unknown');
 const key=createHash('sha256').update(ip).digest('hex');
 const limit=limits.get(key)||{count:0,expires:now+WINDOW};
 if(limit.count>=5||recent.size>=2000||limits.size>=5000){res.setHeader('Retry-After','600');return reply(res,429,{error:'Too many attempts. Please wait 10 minutes or email support@margevia.solutions.'});}
 limit.count++;limits.set(key,limit);
 recent.set(fingerprint,{expires:now+WINDOW,sent:false});
 const content='<h2>Margevia pilot brief</h2><dl>'+Object.entries(data).map(([label,value])=>'<dt><strong>'+({name:'Name',email:'Email',company:'Company',team:'Team',focus:'First check',sites:'Locations'}[label])+'</strong></dt><dd>'+escapeHtml(value)+'</dd>').join('')+'</dl><p>Submitted through margevia.solutions. Reply to the contact email above.</p>';
 try{
  const response=await fetch(process.env.PILOT_WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({subject:'Margevia pilot brief: '+data.company,content,replyTo:data.email,submissionId:fingerprint}),signal:AbortSignal.timeout(20000),redirect:'error'});
  const result=await response.json().catch(()=>null);
  if(!response.ok||result?.sent!==true||typeof result?.messageId!=='string'||!result.messageId)throw new Error('Delivery unconfirmed');
  recent.set(fingerprint,{expires:now+WINDOW,sent:true});
  return reply(res,200,{sent:true});
 }catch{
  // Do not retry an uncertain delivery automatically; the provider might already have accepted it.
  return reply(res,502,{error:'We could not confirm delivery. Please wait 10 minutes before retrying, or contact support@margevia.solutions.'});
 }
}
module.exports=handler;
module.exports.validate=validate;
