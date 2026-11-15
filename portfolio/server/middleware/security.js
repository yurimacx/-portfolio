const rateLimit = require('express-rate-limit');
const cfg = require('../config');

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 200, standardHeaders: true, legacyHeaders: false });
const strictLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false,
  message: { error: 'Muitas tentativas. Aguarde alguns minutos.' } });

// Proteção CSRF: cookie SameSite=Strict + Origin obrigatório e igual ao do site em métodos que alteram dados.
function originCheck(req, res, next) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  if (req.headers.origin !== cfg.origin) return res.status(403).json({ error: 'Origem não permitida' });
  if (!req.is('application/json')) return res.status(415).json({ error: 'Use application/json' });
  next();
}
module.exports = { limiter, strictLimiter, originCheck };
