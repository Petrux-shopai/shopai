// index.js - Server for Petrux ShopAI
const express = require('express');
const { handleMessage } = require('./brain.js');

const app = express();
app.use(express.json());

// Test page - open this in browser to see if it works
app.get('/', (req, res) => {
  res.send('Petrux ShopAI is LIVE! 🇳🇬🇺🇸');
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
