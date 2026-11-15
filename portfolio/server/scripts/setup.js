// Configuração em um comando: cria o .env, sobe o banco (Docker) e cria o admin.
const fs = require('fs'), path = require('path'), crypto = require('crypto'), readline = require('readline');
const { spawnSync } = require('child_process');
const root = path.join(__dirname, '..', '..');
const envPath = path.join(root, '.env');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((r) => rl.question(q, r));
const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

(async () => {
  const email = (await ask('E-mail do admin: ')).trim();
  const pass = await ask('Senha do admin (12+ caracteres): ');
  rl.close();
  if (!/^\S+@\S+\.\S+$/.test(email) || pass.length < 12) {
    console.error('E-mail inválido ou senha com menos de 12 caracteres. Rode npm run setup de novo.'); process.exit(1);
  }
  if (!fs.existsSync(envPath)) {
    const env = fs.readFileSync(path.join(root, '.env.example'), 'utf8')
      .replace(/^JWT_SECRET=.*$/m, 'JWT_SECRET=' + crypto.randomBytes(48).toString('hex'));
    fs.writeFileSync(envPath, env);
    console.log('.env criado.');
  } else console.log('.env já existe: mantido como está.');

  console.log('Subindo o banco de dados (Docker)...');
  const d = spawnSync('docker', ['compose', 'up', '-d', 'db'], { cwd: root, stdio: 'inherit', shell: true });
  if (d.status !== 0) { console.error('Não consegui iniciar o banco. Abra o Docker Desktop, espere ele iniciar e rode npm run setup de novo.'); process.exit(1); }

  for (let i = 1; i <= 15; i++) { // a senha vai só para este processo e não é gravada em arquivo
    const r = spawnSync(process.execPath, ['server/scripts/create-admin.js'], {
      cwd: root, stdio: i === 15 ? 'inherit' : 'pipe', env: { ...process.env, ADMIN_EMAIL: email, ADMIN_PASSWORD: pass } });
    if (r.status === 0) { console.log('Pronto! Agora rode: npm run dev'); return; }
    console.log(`Aguardando o banco iniciar (${i}/15)...`); sleep(3000);
  }
  console.error('O banco não respondeu. Confira se o Docker Desktop está rodando.'); process.exit(1);
})();
