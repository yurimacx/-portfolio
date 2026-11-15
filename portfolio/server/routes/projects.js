const router = require('express').Router();
const { z } = require('zod');
const db = require('../db');
const requireAuth = require('../middleware/auth');

const schema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(1000),
  stack: z.string().trim().max(200).default(''),
  url: z.string().trim().url().max(500).refine((u) => /^https?:\/\//i.test(u), 'Use http(s)').optional().or(z.literal('')),
});
const idOf = (req) => (/^\d{1,9}$/.test(req.params.id) ? Number(req.params.id) : null);

router.get('/', async (req, res, next) => {
  try { res.json((await db.query('SELECT id, title, description, stack, url FROM projects ORDER BY created_at DESC')).rows); }
  catch (e) { next(e); }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const p = schema.safeParse(req.body);
    if (!p.success) return res.status(400).json({ error: 'Dados inválidos' });
    const { title, description, stack, url } = p.data;
    const { rows } = await db.query(
      'INSERT INTO projects (title, description, stack, url) VALUES ($1,$2,$3,$4) RETURNING id', [title, description, stack, url || null]);
    res.status(201).json(rows[0]);
  } catch (e) { next(e); }
});

router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const id = idOf(req); const p = schema.safeParse(req.body);
    if (!id || !p.success) return res.status(400).json({ error: 'Dados inválidos' });
    const { title, description, stack, url } = p.data;
    const r = await db.query('UPDATE projects SET title=$1, description=$2, stack=$3, url=$4 WHERE id=$5',
      [title, description, stack, url || null, id]);
    if (!r.rowCount) return res.status(404).json({ error: 'Projeto não encontrado' });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const id = idOf(req);
    if (!id) return res.status(400).json({ error: 'ID inválido' });
    await db.query('DELETE FROM projects WHERE id = $1', [id]);
    res.json({ ok: true });
  } catch (e) { next(e); }
});
module.exports = router;
