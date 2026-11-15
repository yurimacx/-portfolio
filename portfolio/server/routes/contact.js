const router = require('express').Router();
const { z } = require('zod');
const db = require('../db');
const requireAuth = require('../middleware/auth');
const notify = require('../mailer');
const { strictLimiter } = require('../middleware/security');

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  body: z.string().trim().min(5).max(2000),
  website: z.string().max(0).optional(), // honeypot: robôs preenchem
});
router.post('/', strictLimiter, async (req, res, next) => {
  try {
    const p = schema.safeParse(req.body);
    if (!p.success) return res.status(400).json({ error: 'Verifique os campos e tente de novo' });
    await db.query('INSERT INTO messages (name, email, body) VALUES ($1,$2,$3)', [p.data.name, p.data.email, p.data.body]);
    notify(p.data).catch((e) => console.error('Falha no e-mail:', e.message)); // não bloqueia a resposta
    res.status(201).json({ ok: true });
  } catch (e) { next(e); }
});
router.get('/', requireAuth, async (req, res, next) => {
  try { res.json((await db.query('SELECT id, name, email, body, created_at FROM messages ORDER BY created_at DESC LIMIT 100')).rows); }
  catch (e) { next(e); }
});
module.exports = router;
