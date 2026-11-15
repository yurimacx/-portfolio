const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const db = require('../db');
const cfg = require('../config');
const { strictLimiter } = require('../middleware/security');
const requireAuth = require('../middleware/auth');

const DUMMY = bcrypt.hashSync('dummy-password', 12); // iguala o tempo de resposta quando o e-mail não existe
const schema = z.object({ email: z.string().email().max(254), password: z.string().min(1).max(200) });
const cookieOpts = { httpOnly: true, secure: cfg.prod, sameSite: 'strict', path: '/' };

router.post('/login', strictLimiter, async (req, res, next) => {
  try {
    const p = schema.safeParse(req.body);
    if (!p.success) return res.status(400).json({ error: 'Dados inválidos' });
    const { rows } = await db.query('SELECT id, password_hash FROM users WHERE email = $1', [p.data.email.toLowerCase()]);
    const ok = await bcrypt.compare(p.data.password, rows[0]?.password_hash || DUMMY);
    if (!rows[0] || !ok) return res.status(401).json({ error: 'E-mail ou senha incorretos' });
    const token = jwt.sign({}, cfg.jwtSecret, { subject: String(rows[0].id), expiresIn: '2h', algorithm: 'HS256' });
    res.cookie('token', token, { ...cookieOpts, maxAge: 2 * 60 * 60 * 1000 }).json({ ok: true });
  } catch (e) { next(e); }
});

router.post('/logout', (req, res) => res.clearCookie('token', cookieOpts).json({ ok: true }));
router.get('/me', requireAuth, (req, res) => res.json({ ok: true }));
module.exports = router;
