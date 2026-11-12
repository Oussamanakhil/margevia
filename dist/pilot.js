'use strict';
(()=>{
 const form=document.querySelector('#pilot-form');
 const button=form.querySelector('button[type="submit"]');
 const label=button.querySelector('span');
 const feedback=document.querySelector('#pilot-feedback');
 let pending=false,sent=false;
 function status(text,state=''){feedback.textContent=text;feedback.dataset.state=state;}
 function clearErrors(){form.querySelectorAll('[aria-invalid]').forEach(input=>{input.removeAttribute('aria-invalid');input.removeAttribute('aria-describedby');});form.querySelectorAll('.field-error').forEach(error=>error.remove());}
 fetch('/api/pilot',{signal:AbortSignal.timeout(8000)}).then(response=>response.ok?response.json():null).then(result=>{
  if(result?.available){button.disabled=false;status('Your details and pilot choices will be emailed to Margevia so we can respond to your enquiry.');}
  else status('Brief delivery is being connected. You can email us using the link below.');
 }).catch(()=>status('Brief delivery is unavailable right now. You can email us using the link below.'));
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(pending||sent||button.disabled)return;
  clearErrors();if(!form.reportValidity())return;
  pending=true;button.disabled=true;label.textContent='Sending…';form.setAttribute('aria-busy','true');status('Sending your brief…');
  try{
   const response=await fetch('/api/pilot',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form))),signal:AbortSignal.timeout(25000)});
   const result=await response.json();
   if(!response.ok||result.sent!==true){
    if(result.fields){for(const [name,message] of Object.entries(result.fields)){const input=form.querySelector('[name="'+name+'"]');if(!input)continue;const error=document.createElement('p');error.id='error-'+name;error.className='field-error';error.textContent=message;input.closest('.pilot-field,fieldset').append(error);input.setAttribute('aria-invalid','true');input.setAttribute('aria-describedby',error.id);}form.querySelector('[aria-invalid]')?.focus();}
    throw new Error(result.error||'We could not confirm delivery. Please contact us using the email link below.');
   }
   sent=true;label.textContent='Brief sent';status('Thank you. Your brief has been sent to Margevia. We can reply using the email you provided.','success');
   // Keep the submitted brief visible and prevent accidental repeat sends.
   form.querySelectorAll('input,select').forEach(input=>input.disabled=true);
  }catch(error){status(error.name==='TimeoutError'||error.name==='TypeError'?'We could not confirm delivery. Your entries are still here. Please wait before retrying, or email us below.':error.message,'error');label.textContent='Send brief';}
  finally{pending=false;button.disabled=sent;form.removeAttribute('aria-busy');}
 });
})();
