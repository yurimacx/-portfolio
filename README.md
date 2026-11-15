# Portfólio: Node.js + PostgreSQL

## Rodar localmente
Requisitos: Node.js 20+ e Docker Desktop (aberto).
1. `npm install`
2. `npm run setup` (pede e-mail e senha do admin; cria o `.env`, o banco e o admin)
3. `npm run dev`
Site: http://localhost:3000 | Painel: http://localhost:3000/admin.html
(No PowerShell, se `npm` for bloqueado, use `npm.cmd`.)

## Adicionar prévias de sites ao carrossel
1. Copie a imagem (`.webp`, `.jpg`, `.png`) ou o vídeo (`.mp4`, `.webm`) para `public/assets/previews/`.
2. Adicione um item em `public/data/previews.json`:
```json
{
  "title": "Nome do site",
  "description": "Frase curta (opcional)",
  "url": "https://seusite.com",
  "type": "image",
  "media": "/assets/previews/nome-do-arquivo.webp",
  "alt": "Descrição da prévia"
}
```
- `type` pode ser `"image"` ou `"video"`. Vídeos tocam sem som e em loop; mantenha-os abaixo de uns 10 MB.
- `url` é opcional (só http/https). Com ela, o slide abre o site em outra aba.
- Dica: use capturas de tela de página inteira (a imagem é alinhada pelo topo). Máximo de 12 itens.
- Troque ou apague os 4 exemplos (`exemplo-1.webp` a `exemplo-4.webp`).

## Estrutura
- `server/` API (Express): `routes/`, `middleware/`, `scripts/`, `mailer.js` (aviso por e-mail opcional)
- `database/` schema SQL
- `public/` site: `index.html`, `css/site.css`, `js/` (`site.js` efeitos, `carousel.js`, `contact.js`, `i18n.js` idiomas), `data/previews.json`, `assets/`
- `public/admin.html` painel (projetos e mensagens)
- `tests/` testes (`npm test`)

## Idiomas, fontes e imagens
- Idiomas: `public/js/i18n.js` (pt, en, it, el). O botão no topo troca todo o texto e lembra a escolha.
- Fonte: Montserrat (ver `public/assets/fonts/LEIA-ME.txt`). Sem o arquivo, usa Inter/Helvetica/Arial.
- Imagens da galeria em tom carmesim: `public/assets/img/`. As versões originais em preto e branco estão em `public/assets/img/bw/`. Confirme que você tem direito de uso de cada imagem antes de publicar.

## Nuvem (exemplo AWS)
- Banco: RDS PostgreSQL privado (sem acesso público), `DB_SSL=true`.
- App: Dockerfile pronto para App Runner/ECS; health check em `/health`.
- Segredos (`JWT_SECRET`, `DATABASE_URL`) no Secrets Manager, nunca no repositório.
- HTTPS obrigatório (certificado ACM no balanceador) e `SITE_ORIGIN=https://seudominio.com`, `NODE_ENV=production`.
- Rode `npm audit` periodicamente e mantenha dependências atualizadas.
