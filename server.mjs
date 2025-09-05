import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

// включаем CORS для любых источников (потом можно ограничить)
app.use(cors());

// базовый healthcheck
app.get("/", (req, res) => {
  res.json({ status: "ok", msg: "Eterium API root" });
});

// health endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// ping endpoint
app.get("/ping", (req, res) => {
  res.json({ pong: true, time: Date.now() });
});

app.listen(PORT, () => {
  console.log(`API running on :${PORT}`);
});
