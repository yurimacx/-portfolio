'use strict';
const form = document.getElementById('form-contato');
const st = document.getElementById('status');
const say = (key) => { st.dataset.i18n = key; st.textContent = t(key); };
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))) });
    if (!r.ok) throw new Error();
    form.reset(); say('contact.ok');
  } catch { say('contact.fail'); }
});
