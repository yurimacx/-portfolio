require('dotenv').config();
const need = (k) => {
  const v = process.env[k];
  if (!v) { console.error(`Variável obrigatória ausente: ${k}`); process.exit(1); }
  return v;
};
const prod = process.env.NODE_ENV === 'production';
const jwtSecret = need('JWT_SECRET');
if (jwtSecret.length < 32) { console.error('JWT_SECRET precisa ter 32+ caracteres'); process.exit(1); }
module.exports = {
  prod,
  port: Number(process.env.PORT) || 3000,
  origin: need('SITE_ORIGIN'),
  databaseUrl: need('DATABASE_URL'),
  dbSsl: process.env.DB_SSL === 'true',
  jwtSecret,
};
