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

// Keep the contents rail aligned with the section crossing the reading line.
const articleLinks=Array.from(document.querySelectorAll('.article-aside ol a[href^="#"]'));
const articleSections=articleLinks.map(link=>document.getElementById(link.hash.slice(1)));
if(articleLinks.length&&articleSections.every(Boolean)){
 let currentSection=-1;
 let framePending=false;
 function updateReadingSection(){
  framePending=false;
  const headerBottom=document.querySelector('.header').getBoundingClientRect().bottom;
  const readingLine=Math.max(headerBottom+40,Math.min(innerHeight*.32,320));
  let next=-1;
  articleSections.forEach((section,index)=>{if(section.getBoundingClientRect().top<=readingLine)next=index;});
  if(next===currentSection)return;
  currentSection=next;
  articleLinks.forEach((link,index)=>{
   if(index===next)link.setAttribute('aria-current','location');
   else link.removeAttribute('aria-current');
  });
 }
 function scheduleReadingUpdate(){
  if(framePending)return;
  framePending=true;
  requestAnimationFrame(updateReadingSection);
 }
 window.addEventListener('scroll',scheduleReadingUpdate,{passive:true});
 window.addEventListener('resize',scheduleReadingUpdate);
 window.addEventListener('hashchange',scheduleReadingUpdate);
 window.addEventListener('pageshow',scheduleReadingUpdate);
 document.fonts.ready.then(scheduleReadingUpdate);
 updateReadingSection();
}
