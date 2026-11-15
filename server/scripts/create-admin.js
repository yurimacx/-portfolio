const bcrypt = require('bcryptjs');
const db = require('../db');
(async () => {
  const email = (process.env.ADMIN_EMAIL || '').toLowerCase();
  const pass = process.env.ADMIN_PASSWORD || '';
  if (!email || pass.length < 12) { console.error('Defina ADMIN_EMAIL e ADMIN_PASSWORD (12+ caracteres) no .env'); process.exit(1); }
  await db.query('INSERT INTO users (email, password_hash) VALUES ($1,$2) ON CONFLICT (email) DO UPDATE SET password_hash = $2',
    [email, await bcrypt.hash(pass, 12)]);
  console.log('Admin criado/atualizado. Remova ADMIN_PASSWORD do .env agora.');
  await db.end();
})();
