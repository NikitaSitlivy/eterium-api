import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаем запросы только с твоего фронтенда
const ORIGINS = ['https://eterium.space', 'https://www.eterium.space'];
app.use(cors({ origin: ORIGINS, credentials: false }));

app.use(express.json());

// Health
app.get('/ping', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.json({ ok: true, ts: Date.now() });
});

// Кто я с точки зрения сервера
app.get('/whoami', (req, res) => {
  const xfwd = req.headers['x-forwarded-for'] || '';
  const ip = (Array.isArray(xfwd) ? xfwd[0] : xfwd).split(',')[0].trim() || req.socket.remoteAddress || null;
  res.setHeader('Cache-Control', 'no-store');
  res.json({
    ip,
    ua: req.headers['user-agent'] || null,
    country: req.headers['cf-ipcountry'] || req.headers['x-country'] || null,
    time: new Date().toISOString(),
    headers_sample: {
      'accept-language': req.headers['accept-language'] || null,
      'sec-ch-ua': req.headers['sec-ch-ua'] || null
    }
  });
});

// Заголовки запроса
app.get('/headers', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.json({ headers: req.headers, method: req.method });
});

// DNS over HTTPS через Cloudflare
app.get('/dns', async (req, res) => {
  try {
    const name = (req.query.name || '').toString();
    if (!name) return res.status(400).json({ error: 'query param "name" is required' });
    const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=A`;
    const r = await fetch(url, { headers: { 'accept': 'application/dns-json' }});
    res.setHeader('Cache-Control', 'no-store');
    res.json(await r.json());
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.listen(PORT, () => console.log('API on :' + PORT));
