'use strict';
const menuButton=document.querySelector('.menu-button');
const navigation=document.querySelector('#nav');
function closeJournalMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');navigation.classList.remove('open');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeJournalMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeJournalMenu();menuButton.focus();}});
const copyButton=document.querySelector('#copy-article');
if(copyButton){
 const feedback=document.querySelector('#copy-feedback');
 copyButton.addEventListener('click',async()=>{
  const url=document.querySelector('link[rel=canonical]').href;
  try{await navigator.clipboard.writeText(url);feedback.textContent='Article link copied.';}
  catch{const fallback=document.querySelector('#copy-fallback');fallback.hidden=false;fallback.focus();fallback.select();feedback.textContent='Select and copy the link below.';}
 });
}
