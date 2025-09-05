# Eterium API (Render)

Простой Node.js/Express API для eterium.space

## Эндпоинты
- `GET /ping` — health-check
- `GET /whoami` — ваш IP/UA как видит сервер
- `GET /headers` — все заголовки запроса
- `GET /dns?name=example.com` — DNS-over-HTTPS резолв через Cloudflare

## Локальный старт
```bash
npm ci
npm start
```
Откроется на `http://localhost:3000`.

## Деплой на Render
1. Залейте этот репозиторий в GitHub как `eterium-api`.
2. В Render: **New → Web Service → Connect repo**.
3. Build command: `npm ci` / Start command: `npm start` / Plan: Free.
4. После деплоя возьмите выданный Render-домен вида `https://...onrender.com`.

### Кастомный домен
Добавьте в Render → Settings → Custom Domains домен `api.eterium.space`.
В DNS у регистратора создайте CNAME:
```
api  CNAME  <ваш-сервис>.onrender.com.
```
Дождитесь статуса **Verified** и выпуска SSL.
