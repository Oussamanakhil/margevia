'use strict';
(() => {
  const root = document.documentElement;
  const hero = document.querySelector('.hero-visual');
  const toggle = document.querySelector('#motion-toggle');
  const active = new Map();
  const visible = new WeakMap();
  const ease = 'cubic-bezier(.16,1,.3,1)';
  let quiet = false;
  let heroPlayed = false;
  const reduced = () => quiet;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      visible.set(entry.target, entry.isIntersecting);
      active.forEach((scope, animation) => {
        if (scope === entry.target) {
          if (entry.isIntersecting && !document.hidden) animation.play();
          else animation.pause();
        }
      });
    });
  }, {threshold: 0});
  function stop(scope) {
    active.forEach((owner, animation) => {
      if (!scope || owner === scope) { animation.cancel(); active.delete(animation); }
    });
  }
  function animate(element, frames, duration = 320, delay = 0, scope = element) {
    if (!element || reduced()) return;
    observer.observe(scope);
    const animation = element.animate(frames, {duration, delay, easing: ease, fill: 'none'});
    active.set(animation, scope);
    if (document.hidden || visible.get(scope) === false) animation.pause();
    animation.finished.then(() => active.delete(animation), () => active.delete(animation));
    return animation;
  }
  function settle(element, delay = 0, scope = element) {
    return animate(element, [{opacity:.35, transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}], 380, delay, scope);
  }
  function playHero() {
    stop(hero);
    if (reduced()) return;
    const rotations = [-5, 2, -3];
    hero.querySelectorAll('.flow-document').forEach((card, i) => {
      animate(card, [
        {opacity:.5,transform:`translate(-14px, 8px) rotate(${rotations[i]-2}deg)`},
        {opacity:1,transform:`translate(0, 0) rotate(${rotations[i]}deg)`}
      ], 750, i*210, hero);
      animate(card.querySelector('.document-icon'), [{backgroundColor:'#efefff',color:'#5758db'},{backgroundColor:'#f6f6fa',color:'#7a7e90'}], 850, 350+i*210, hero);
    });
    hero.querySelectorAll('.connector:not(.connector-result)').forEach((line,i) => {
      animate(line,[{clipPath:'inset(0 100% 0 0)',opacity:.3,borderColor:'#6264ef'},{clipPath:'inset(0 0% 0 0)',opacity:1,borderColor:'#6264ef',offset:.7},{clipPath:'inset(0 0% 0 0)',opacity:1,borderColor:'#d5d3f3'}],1000,500+i*210,hero);
    });
    animate(hero.querySelector('.reconcile-node'),[{transform:'scale(1)'},{transform:'scale(1.09)',offset:.35},{transform:'scale(1)'}],650,1150,hero);
    animate(hero.querySelector('.hub-ring'),[{transform:'scale(1)',opacity:0},{transform:'scale(1.12)',opacity:.55,offset:.2},{transform:'scale(1.8)',opacity:0}],900,1200,hero);
    animate(hero.querySelector('.connector-result'),[{clipPath:'inset(0 0 100% 0)',borderColor:'#6264ef'},{clipPath:'inset(0 0 0% 0)',borderColor:'#c5c1f4'}],500,1450,hero);
    animate(hero.querySelector('.result-ticket'),[{opacity:.45,transform:'translateY(13px) scale(.98)'},{opacity:1,transform:'translateY(0) scale(1)'}],700,1720,hero);
    animate(hero.querySelector('.ticket-amount'),[{opacity:.5,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],500,1950,hero);
    animate(hero.querySelector('.ticket-foot .icon'),[{opacity:.3,transform:'scale(.65)'},{opacity:1,transform:'scale(1)'}],420,2350,hero);
  }
  function updatePreference() {
    root.dataset.motion = reduced() ? 'reduced' : 'full';
    stop();
    toggle.setAttribute('aria-pressed', String(reduced()));
    toggle.textContent = reduced() ? 'Enable motion' : 'Reduce motion';
  }
  toggle.addEventListener('click', () => { quiet = !reduced(); updatePreference(); if (!reduced()) playHero(); });
  document.addEventListener('visibilitychange', () => {
    active.forEach((scope, animation) => {
      if (document.hidden) animation.pause();
      else if (visible.get(scope) !== false) animation.play();
    });
  });
  updatePreference();
  const entrance = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      entrance.unobserve(element);
      if (element === hero) { if (!heroPlayed) {heroPlayed = true; playHero();} return; }
      if (element.matches('.steps')) {
        element.querySelectorAll('article').forEach((step,i) => {
          const track = document.createElement('span'); track.className='step-track'; track.setAttribute('aria-hidden','true'); step.append(track);
          animate(track,[{transform:'scaleX(0)',opacity:.7},{transform:'scaleX(1)',opacity:.7,offset:.7},{transform:'scaleX(1)',opacity:0}],1100,i*260,element);
          settle(step.querySelector('.step-files, .step-match, .step-complete'),i*260,element);
        });
      } else if (element.matches('.comparison')) {
        element.querySelectorAll('.compare-col').forEach((column,i)=>settle(column,i*140,element));
        animate(element.querySelector('.compare-arrow'),[{transform:'translateX(-8px)',opacity:.3},{transform:'translateX(0)',opacity:1}],550,200,element);
      } else if (element.matches('.team-rows')) {
        element.querySelectorAll('article').forEach((row,i)=>animate(row,[{opacity:.45},{opacity:1}],500,i*100,element));
      } else if (element.matches('.workspace')) {
        settle(element.querySelector('.summary-row'),0,element);
      } else if (element.matches('#pilot-form')) {
        animate(element,[{borderColor:'#b6b2f6'},{borderColor:'#e0dfe9'}],900,0,element);
      }
    });
  }, {threshold:.18});
  document.querySelectorAll('.hero-visual,.comparison,.steps,.team-rows,.workspace,#pilot-form').forEach(element=>entrance.observe(element));
  function featureMotion() {
    const panel=document.querySelector('.feature-panel:not([hidden])');
    document.querySelectorAll('.feature-panel').forEach(stop);
    panel.querySelectorAll(':scope > div').forEach((child,i)=>settle(child,i*55,panel));
  }
  document.querySelector('.feature-tabs').addEventListener('click',event=>{if(event.target.closest('[data-feature]')) featureMotion();});
  document.querySelector('.feature-tabs').addEventListener('keydown',event=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) featureMotion();});
  document.querySelector('.invoice-list').addEventListener('click',event=>{
    if(!event.target.closest('[data-invoice]'))return;
    const detail=document.querySelector('.invoice-detail'); stop(detail);
    detail.querySelectorAll('.detail-heading,.summary-row,#invoice-rows tr').forEach((row,i)=>settle(row,Math.min(i*30,120),detail));
  });
  document.querySelector('#review-button').addEventListener('click',()=>{
    const status=document.querySelector('#review-status'); stop(status);
    animate(status,[{transform:'scale(.94)',opacity:.4},{transform:'scale(1)',opacity:1}],260,0,status);
  });
  document.querySelectorAll('.faq-list details').forEach(detail=>detail.addEventListener('toggle',()=>{
    stop(detail); if(detail.open) settle(detail.querySelector('p'),0,detail);
  }));
  document.querySelectorAll('#export-button,#pilot-form').forEach(element=>element.addEventListener(element.tagName==='FORM'?'submit':'click',()=>{
    const feedback=document.querySelector(element.tagName==='FORM'?'#pilot-feedback':'#demo-feedback');stop(feedback);
    animate(feedback,[{opacity:.4},{opacity:1}],220,0,feedback);
  }));
})();
