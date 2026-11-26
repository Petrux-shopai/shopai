// index.js - Server for Petrux ShopAI
const express = require('express');
const { handleMessage } = require('./brain.js');
const { STORES } = require('./stores.js');

const app = express();
app.use(express.json());

// Beautiful Homepage
app.get('/', (req, res) => {
  const store = STORES.NG;
  let cards = '';
  store.products.forEach(p => {
    const msg = encodeURIComponent(`Hi Petrux! I want to buy ${p.name} - ₦${p.price.toLocaleString()}`);
    cards += `
      <div class="card">
        <div class="emoji">${p.name.includes('Rice') ? '🍚' : p.name.includes('Chicken') ? '🍗' : p.name.includes('Indomie') ? '🍜' : p.name.includes('Oil') ? '🫒' : p.name.includes('Egg') ? '🥚' : p.name.includes('Bread') ? '🍞' : p.name.includes('Milk') ? '🥛' : p.name.includes('Yam') ? '🍠' : p.name.includes('Plantain') ? '🍌' : '🛒'}</div>
        <h3>${p.name}</h3>
        <p class="price">₦${p.price.toLocaleString()}</p>
        <a class="btn" href="https://wa.me/2347041574932?text=${msg}" target="_blank">Order on WhatsApp</a>
      </div>`;
  });

  res.send(`
  <!DOCTYPE html>
  <html><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>Petrux ShopAI - Fresh Groceries</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:Arial,sans-serif}
    body{background:#f6f6f6;color:#111}
    .hero{background:linear-gradient(135deg,#0a7a42,#00c853);color:white;padding:32px 16px;text-align:center}
    .hero h1{font-size:32px;margin-bottom:8px}
    .hero p{opacity:.95;line-height:1.5}
    .badge{display:inline-block;background:white;color:#0a7a42;padding:6px 14px;border-radius:20px;font-weight:bold;margin-top:12px;font-size:13px}
    .bar{background:white;padding:14px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,.08);position:sticky;top:0;z-index:10}
    .bar b{color:#0a7a42}
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px;padding:16px;max-width:1000px;margin:auto}
    .card{background:white;border-radius:14px;padding:16px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,.06)}
    .emoji{font-size:36px;margin-bottom:8px}
    .card h3{font-size:15px;min-height:38px}
    .price{color:#0a7a42;font-weight:bold;font-size:18px;margin:8px 0}
    .btn{display:block;background:#25D366;color:white;text-decoration:none;padding:10px;border-radius:10px;font-weight:bold;font-size:13px}
    .pay{background:#111;color:white;margin:16px;padding:18px;border-radius:14px;text-align:center;max-width:1000px;margin-left:auto;margin-right:auto}
    .pay h3{margin-bottom:8px}
    .footer{text-align:center;padding:20px;color:#666;font-size:13px}
  </style></head><body>
    <div class="hero">
      <h1>🛒 Petrux ShopAI</h1>
      <p>Fresh groceries delivered fast in Lagos & Edo.<br>Order in seconds on WhatsApp.</p>
      <div class="badge">✅ 30 Products • ✅ Opay Payment • ✅ Fast Delivery</div>
    </div>
    <div class="bar">Delivery: <b>Lagos ₦2,000</b> | <b>Edo ₦1,000</b> &nbsp;•&nbsp; Payment: <b>Opay - Peter Oriorowho - 7041574932</b></div>
    <div class="grid">${cards}</div>
    <div class="pay">
      <h3>How to Order</h3>
      <p>1. Tap Order on WhatsApp &nbsp;→&nbsp; 2. Pay to Opay <b>Peter Oriorowho - 7041574932</b> &nbsp;→&nbsp; 3. Send receipt to <b>07041574932</b></p>
      <br><a class="btn" style="display:inline-block;padding:12px 24px" href="https://wa.me/2347041574932?text=${encodeURIComponent('Hi Petrux! Show me menu')}" target="_blank">Chat on WhatsApp 💬</a>
    </div>
    <div class="footer">Petrux ShopAI • Lagos, Nigeria • 07041574932</div>
  </body></html>`);
});

// This is where WhatsApp will send messages later
app.post('/webhook', (req, res) => {
  const phone = req.body.phone || "2340000000000";
  const text = req.body.text || "hi";
  const reply = handleMessage(phone, text);
  console.log("User:", text);
  console.log("Bot:", reply);
  res.json({ reply: reply });
});

// For testing in browser: /test?text=menu
app.get('/test', (req, res) => {
  const text = req.query.text || "hi";
  const reply = handleMessage("2348012345678", text);
  res.send(`<h2>You said: ${text}</h2><p>${reply.replace(/\n/g, '<br>')}</p>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Petrux ShopAI running on ${PORT}`));
