const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cfg = require('./config');
const { limiter, originCheck } = require('./middleware/security');

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1); // atrás de load balancer (ALB, Cloud Run, etc.)

app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'"], scriptSrc: ["'self'"], styleSrc: ["'self'"],
      imgSrc: ["'self'", 'data:'], connectSrc: ["'self'"], objectSrc: ["'none'"],
      baseUri: ["'self'"], formAction: ["'self'"], frameAncestors: ["'none'"],
      ...(cfg.prod ? { upgradeInsecureRequests: [] } : {}),
    },
  },
  hsts: cfg.prod ? { maxAge: 31536000, includeSubDomains: true } : false,
}));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.get('/health', (req, res) => res.json({ ok: true })); // health check do balanceador
app.use('/api', limiter, originCheck);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api', (req, res) => res.status(404).json({ error: 'Não encontrado' }));

app.use(express.static(path.join(__dirname, '..', 'public'), { dotfiles: 'ignore' }));
app.use((err, req, res, next) => {
  console.error(err.message); // nunca devolve detalhes ao cliente
  res.status(500).json({ error: 'Erro interno' });
});
app.listen(cfg.port, () => console.log(`Rodando na porta ${cfg.port}`));
