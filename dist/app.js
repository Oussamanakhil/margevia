'use strict';
const invoices={
 greenfield:{name:'Greenfield Foods',id:'GF-1042',date:'04 November 2026',reference:'November price list',delivery:'DL-2081',total:1588.8,matched:1492.8,difference:96,rows:[['Chicken breast','120 kg','€8.40 / kg','€9.10 / kg',84],['Unsalted butter','24 packs','€6.20 / pack','€6.20 / pack',0],['Olive oil','24 bottles','€14.00 / bottle','€14.50 / bottle',12]]},
 harbour:{name:'Harbour Fresh',id:'HF-308',date:'05 November 2026',reference:'agreed unit prices',delivery:'HF-306',total:354,matched:312,difference:42,rows:[['Seasonal vegetables','30 billed','24 × €7.00','30 × €7.00',42],['Fresh herbs','12 bunches','€4.50 / bunch','€4.50 / bunch',0],['Potatoes','50 kg','€1.80 / kg','€1.80 / kg',0]]},
 daily:{name:'Daily Provisions',id:'DP-612',date:'06 November 2026',reference:'November price list',delivery:'DP-608',total:228,matched:228,difference:0,rows:[['Whole milk','60 litres','€1.20 / litre','€1.20 / litre',0],['Plain flour','100 kg','€0.90 / kg','€0.90 / kg',0],['Free-range eggs','12 trays','€5.50 / tray','€5.50 / tray',0]]}
};
let currentInvoice='greenfield';const reviewed=new Set();const $=s=>document.querySelector(s);const money=n=>new Intl.NumberFormat('en-IE',{style:'currency',currency:'EUR'}).format(n);
function renderInvoice(key){
 currentInvoice=key;const item=invoices[key];
 document.querySelectorAll('[data-invoice]').forEach(b=>{const selected=b.dataset.invoice===key;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});
 $('#invoice-title').textContent=item.name;$('#invoice-meta').textContent=`Invoice ${item.id} · ${item.date}`;
 $('#invoice-total').textContent=money(item.total);$('#matched-total').textContent=money(item.matched);$('#difference-total').textContent=money(item.difference);
 const body=$('#invoice-rows');body.replaceChildren();
 item.rows.forEach(row=>{const tr=document.createElement('tr');row.forEach((value,index)=>{const td=document.createElement('td');td.textContent=index===4?(value>0?'+'+money(value):'Matched'):value;if(index===4)td.className=value>0?'difference-cell':'match-cell';tr.append(td);});body.append(tr);});
 $('#evidence-note').innerHTML='<svg class="icon" aria-hidden="true" focusable="false"><use href="#doc"/></svg><span>Compared with <b>'+item.reference+'</b> and delivery note <b>'+item.delivery+'</b>.</span>';
 const status=$('#review-status'),button=$('#review-button');const done=reviewed.has(key);
 status.textContent=item.difference===0?'All lines matched':done?'Ready for follow-up':'Needs review';status.className='tag '+(item.difference===0?'success':done?'':'warning');
 button.disabled=item.difference===0;button.innerHTML=item.difference===0?'No differences to review':done?'Reset review <svg class="icon" aria-hidden="true" focusable="false"><use href="#arrow"/></svg>':'Prepare credit follow-up <svg class="icon" aria-hidden="true" focusable="false"><use href="#arrow"/></svg>';
 $('#demo-feedback').textContent=done?`${money(item.difference)} ready for follow-up. No credit has been received and no supplier contacted.`:item.difference===0?'All three lines match the sample reference records.':'Sample only. No supplier is contacted.';
}
document.querySelectorAll('[data-invoice]').forEach(b=>b.addEventListener('click',()=>renderInvoice(b.dataset.invoice)));
$('#review-button').addEventListener('click',()=>{reviewed.has(currentInvoice)?reviewed.delete(currentInvoice):reviewed.add(currentInvoice);renderInvoice(currentInvoice);});
function downloadFile(name,content,type){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function csvCell(value){return '"'+String(value).replaceAll('"','""')+'"';}
$('#export-button').addEventListener('click',()=>{const item=invoices[currentInvoice];const rows=[['Margevia sample comparison: fictional data'],['Supplier',item.name],['Invoice',item.id],['Status',reviewed.has(currentInvoice)?'Ready for follow-up; not recovered':item.difference===0?'Matched':'Needs review'],[],['Item','Quantity','Reference','Invoice','Difference EUR'],...item.rows,['Total invoiced EUR',item.total.toFixed(2)],['Total matched EUR',item.matched.toFixed(2)],['Total difference EUR',item.difference.toFixed(2)]];downloadFile('Margevia-'+item.id+'-sample.csv','\uFEFF'+rows.map(r=>r.map(csvCell).join(',')).join('\r\n'),'text/csv;charset=utf-8');$('#demo-feedback').textContent='Sample comparison downloaded. Amounts are illustrative, not recovered credits.';});
const tabs=Array.from(document.querySelectorAll('[data-feature]'));
function selectFeature(tab){tabs.forEach(b=>{const active=b===tab;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;document.getElementById(b.getAttribute('aria-controls')).hidden=!active;});}
tabs.forEach((b,i)=>{b.addEventListener('click',()=>selectFeature(b));b.addEventListener('keydown',event=>{let index;if(event.key==='ArrowRight')index=(i+1)%tabs.length;else if(event.key==='ArrowLeft')index=(i+tabs.length-1)%tabs.length;else if(event.key==='Home')index=0;else if(event.key==='End')index=tabs.length-1;else return;event.preventDefault();selectFeature(tabs[index]);tabs[index].focus();});});
document.querySelectorAll('[data-open-invoice]').forEach(a=>a.addEventListener('click',()=>renderInvoice(a.dataset.openInvoice)));
const menu=$('.menu-button');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');$('#nav').classList.toggle('open',open);});
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');$('#nav').classList.remove('open');}
$('#nav').querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
// Delivery stays unavailable until the owner supplies a recipient and a delivery service is connected.
// Never claim success or download a file in place of a submission.
$('#pilot-form').addEventListener('submit',event=>{
 event.preventDefault();
 $('#pilot-feedback').textContent='Sending is not available yet. No information was sent.';
});
renderInvoice(currentInvoice);

// Dashboard and video share one accessible, keyboard-operable view switcher.
const demoTabs=Array.from(document.querySelectorAll('[data-demo-view]'));
const demoVideo=document.querySelector('#demo-video');
function selectDemoView(tab,focus=false){
 demoTabs.forEach(button=>{const active=button===tab;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;document.getElementById(button.getAttribute('aria-controls')).hidden=!active;});
 if(tab.dataset.demoView!=='video')demoVideo.pause();
 if(focus)tab.focus();
}
demoTabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectDemoView(tab));
 tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight'||event.key==='ArrowLeft')next=1-index;else if(event.key==='Home')next=0;else if(event.key==='End')next=demoTabs.length-1;else return;event.preventDefault();selectDemoView(demoTabs[next],true);});
});
document.querySelector('#show-dashboard').addEventListener('click',()=>selectDemoView(demoTabs[0],true));
const videoToggle=document.querySelector('#video-toggle');
const videoStatus=document.querySelector('#video-status');
function syncVideoControl(){
 const playing=!demoVideo.paused&&!demoVideo.ended;
 videoToggle.setAttribute('aria-label',playing?'Pause video':'Play video');
 videoToggle.querySelector('span').textContent=playing?'Pause':'Play';
 videoToggle.querySelector('.video-play-icon').toggleAttribute('hidden',playing);
 videoToggle.querySelector('.video-pause-icon').toggleAttribute('hidden',!playing);
}
function showVideoError(){
 videoStatus.textContent='The video could not load. Select Play to try again.';
 videoStatus.hidden=false;
 syncVideoControl();
}
videoToggle.addEventListener('click',async()=>{
 if(!demoVideo.paused){demoVideo.pause();return;}
 videoStatus.hidden=true;
 if(demoVideo.error)demoVideo.load();
 try{await demoVideo.play();}
 catch(error){if(error.name!=='AbortError')showVideoError();}
});
['play','pause','ended'].forEach(event=>demoVideo.addEventListener(event,syncVideoControl));
demoVideo.addEventListener('play',()=>{if(document.querySelector('#video-view').hidden)demoVideo.pause();});
demoVideo.addEventListener('error',showVideoError);
demoVideo.addEventListener('contextmenu',event=>event.preventDefault());
const videoConfig=window.MARGEVIA_VIDEO||{};
if(typeof videoConfig.src==='string'&&videoConfig.src.trim()){
 demoVideo.src=videoConfig.src.trim();
 if(videoConfig.poster)demoVideo.poster=videoConfig.poster;
 if(videoConfig.captions){const track=document.createElement('track');track.kind='captions';track.label='English';track.srclang='en';track.src=videoConfig.captions;track.default=true;demoVideo.append(track);}
 demoVideo.hidden=false;document.querySelector('#video-controls').hidden=false;document.querySelector('#video-placeholder').hidden=true;
}

// Links that promise a sample or review must reveal the dashboard.
document.querySelectorAll('.feature-panel a[href="#demo"]').forEach(link=>link.addEventListener('click',()=>selectDemoView(demoTabs[0])));
