'use strict';
const $ = (id) => document.getElementById(id);
const st = $('status');
let editId = null;
const api = async (url, method = 'GET', body) => {
  const r = await fetch(url, { method, headers: body ? { 'Content-Type': 'application/json' } : {}, body: body && JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || 'Erro');
  return j;
};
const el = (tag, text, cls) => { const e = document.createElement(tag); if (text) e.textContent = text; if (cls) e.className = cls; return e; };
const mostrar = (logado) => { $('login').hidden = logado; $('painel').hidden = !logado; if (logado) { listar(); mensagens(); } };

function editar(p) {
  editId = p.id; const f = $('form-projeto');
  for (const k of ['title', 'description', 'stack', 'url']) f.elements[k].value = p[k] || '';
  $('titulo-form').textContent = 'Editar projeto'; $('cancelar').hidden = false; f.scrollIntoView();
}
function limpar() { editId = null; $('form-projeto').reset(); $('titulo-form').textContent = 'Novo projeto'; $('cancelar').hidden = true; }

async function listar() {
  const box = $('lista-admin'); box.replaceChildren();
  for (const p of await api('/api/projects')) {
    const row = el('div', '', 'card'); row.append(el('h3', p.title));
    const ed = el('button', 'Editar', 'btn ghost'); ed.type = 'button'; ed.addEventListener('click', () => editar(p));
    const del = el('button', 'Excluir', 'btn ghost'); del.type = 'button';
    del.addEventListener('click', async () => { if (confirm('Excluir este projeto?')) { await api(`/api/projects/${p.id}`, 'DELETE'); listar(); } });
    row.append(ed, del); box.append(row);
  }
}
async function mensagens() {
  const box = $('lista-msgs'); box.replaceChildren();
  const msgs = await api('/api/contact');
  if (!msgs.length) { box.append(el('p', 'Nenhuma mensagem ainda.', 'muted')); return; }
  for (const m of msgs) {
    const c = el('div', '', 'card');
    c.append(el('h3', m.name), el('p', m.email), el('p', m.body), el('small', new Date(m.created_at).toLocaleString('pt-BR')));
    box.append(c);
  }
}
$('form-login').addEventListener('submit', async (e) => {
  e.preventDefault(); st.textContent = '';
  try { await api('/api/auth/login', 'POST', Object.fromEntries(new FormData(e.target))); e.target.reset(); mostrar(true); }
  catch (err) { st.textContent = err.message; }
});
$('form-projeto').addEventListener('submit', async (e) => {
  e.preventDefault(); st.textContent = '';
  try {
    const dados = Object.fromEntries(new FormData(e.target));
    await (editId ? api(`/api/projects/${editId}`, 'PUT', dados) : api('/api/projects', 'POST', dados));
    limpar(); st.textContent = 'Projeto salvo.'; listar();
  } catch (err) { st.textContent = err.message; }
});
$('cancelar').addEventListener('click', limpar);
$('sair').addEventListener('click', async () => { await api('/api/auth/logout', 'POST', {}); mostrar(false); });
api('/api/auth/me').then(() => mostrar(true)).catch(() => mostrar(false));
