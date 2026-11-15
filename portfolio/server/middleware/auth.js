const jwt = require('jsonwebtoken');
const cfg = require('../config');
module.exports = function requireAuth(req, res, next) {
  try {
    const p = jwt.verify(req.cookies.token || '', cfg.jwtSecret, { algorithms: ['HS256'] });
    req.userId = p.sub;
    next();
  } catch {
    res.status(401).json({ error: 'Não autenticado' });
  }
};
