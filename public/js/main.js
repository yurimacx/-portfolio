'use strict';
const lista = document.getElementById('lista');
const st = document.getElementById('status');
const msg = (el, key) => { el.dataset.i18n = key; el.textContent = t(key); };

async function carregar() {
  try {
    const r = await fetch('/api/projects');
    if (!r.ok) throw new Error();
    const projetos = await r.json();
    lista.replaceChildren();
    if (!projetos.length) { const p = document.createElement('p'); p.className = 'muted'; msg(p, 'projects.empty'); lista.append(p); return; }
    for (const p of projetos) {
      const c = document.createElement('article'); c.className = 'card';
      const h = document.createElement('h3'); h.textContent = p.title;
      const d = document.createElement('p'); d.textContent = p.description;
      const s = document.createElement('small'); s.textContent = p.stack;
      c.append(h, d, s);
      if (p.url && /^https?:\/\//i.test(p.url)) {
        const a = document.createElement('a'); a.href = p.url; msg(a, 'projects.open');
        a.target = '_blank'; a.rel = 'noopener noreferrer'; a.className = 'open';
        c.append(a);
      }
      lista.append(c);
    }
  } catch { lista.replaceChildren(); const p = document.createElement('p'); p.className = 'muted'; msg(p, 'projects.error'); lista.append(p); }
}

document.getElementById('form-contato').addEventListener('submit', async (e) => {
  e.preventDefault();
  const dados = Object.fromEntries(new FormData(e.target));
  try {
    const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados) });
    if (!r.ok) throw new Error();
    e.target.reset(); msg(st, 'contact.ok');
  } catch { msg(st, 'contact.fail'); }
});
carregar();
