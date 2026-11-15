const test = require('node:test');
const assert = require('node:assert');
Object.assign(process.env, { SITE_ORIGIN: 'https://meusite.com', DATABASE_URL: 'postgres://x', JWT_SECRET: 'a'.repeat(40) });
const { originCheck } = require('../server/middleware/security');
const run = (req) => { let out = { next: false }; const res = { status: (c) => ({ json: () => { out.status = c; } }) };
  originCheck(req, res, () => { out.next = true; }); return out; };

test('GET passa sem Origin', () => assert.ok(run({ method: 'GET', headers: {} }).next));
test('POST de outra origem é bloqueado (403)', () => assert.strictEqual(run({ method: 'POST', headers: { origin: 'https://evil.com' } }).status, 403));
test('POST sem Origin é bloqueado (403)', () => assert.strictEqual(run({ method: 'POST', headers: {} }).status, 403));
test('POST da origem correta com JSON passa', () =>
  assert.ok(run({ method: 'POST', headers: { origin: 'https://meusite.com' }, is: () => true }).next));
test('POST que não é JSON retorna 415', () =>
  assert.strictEqual(run({ method: 'POST', headers: { origin: 'https://meusite.com' }, is: () => false }).status, 415));
