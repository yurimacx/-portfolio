# Portfólio: Node.js + PostgreSQL

## Rodar localmente
Requisitos: Node.js 20+ e Docker Desktop (aberto).
1. `npm install`
2. `npm run setup` (pede e-mail e senha do admin; cria o `.env`, o banco e o admin)
3. `npm run dev`
Site: http://localhost:3000 | Painel: http://localhost:3000/admin.html

## Estrutura
- `server/` API (Express): `routes/`, `middleware/`, `scripts/`, `mailer.js` (aviso por e-mail opcional)
- `tests/` testes (`npm test`)
- `database/` schema SQL
- `public/` front end (HTML, CSS, JS, assets)

## Nuvem (exemplo AWS)
- Banco: RDS PostgreSQL privado (sem acesso público), `DB_SSL=true`.
- App: Dockerfile pronto para App Runner/ECS; health check em `/health`.
- Segredos (`JWT_SECRET`, `DATABASE_URL`) no Secrets Manager, nunca no repositório.
- HTTPS obrigatório (certificado ACM no balanceador) e `SITE_ORIGIN=https://seudominio.com`, `NODE_ENV=production`.
- Rode `npm audit` periodicamente e mantenha dependências atualizadas.

## Idiomas, fontes e imagens
- Idiomas: `public/js/i18n.js` (pt, en, it, el). O botão no topo troca o texto e lembra a escolha. Textos de projetos vêm do banco e não são traduzidos.
- Fontes: ver `public/assets/fonts/LEIA-ME.txt`. Sem os arquivos, o site usa Georgia/Times como reserva.
- Imagens: em `public/assets/img/` (WebP otimizado). Confirme que você tem direito de uso de cada imagem antes de publicar.
