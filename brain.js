// brain.js - The Brain for Petrux ShopAI
const { STORES, detectCountry } = require('./stores.js');

function handleMessage(phone, text) {
  const countryCode = detectCountry(phone);
  const store = STORES[countryCode];
  const lower = text.toLowerCase();

  // 1. Greeting
  if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) {
    return `Hello! Welcome to Petrux ShopAI 🇳🇬🇺🇸\n\nI can help you buy groceries from ${store.country}.\n\nType: *menu* to see products\nType: *buy rice* to order`;
  }

  // 2. Show menu
  if (lower.includes("menu") || lower.includes("list") || lower.includes("products")) {
    let menu = `*Petrux ShopAI - ${store.country} Menu:*\n\n`;
    store.products.forEach((p, i) => {
      menu += `${i + 1}. ${p.name} - ${store.symbol}${p.price.toLocaleString()}\n`;
    });
    menu += `\nTo order, type: *buy [product name]*\nExample: buy Rice 1 Bag`;
    if (store.country === "Nigeria") {
      menu += `\n\nDelivery: Lagos ₦2,000 | Edo ₦1,000\nPayment: Opay - Peter Oriorowho - 7041574932`;
    }
    return menu;
  }

  // 3. Buy something - smarter matching
  if (lower.includes("buy")) {
    const found = store.products.find(p => {
      const words = p.name.toLowerCase().split(" ");
      // match if any 2 words match, or first word matches
      return words.some(w => w.length > 2 && lower.includes(w));
    });
    if (found) {
      let reply = `Great choice! ✅\n\n*${found.name}* - ${store.symbol}${found.price.toLocaleString()}\n\nTo confirm, reply: *yes confirm*`;
      if (store.country === "Nigeria") {
        reply += `\n\nPayment: Opay\nAccount Name: Peter Oriorowho\nAccount Number: 7041574932\n\nDelivery: Lagos ₦2,000 | Edo ₦1,000`;
      } else {
        reply += `\nPayment will be via ${store.payment}.`;
      }
      return reply;
    } else {
      return `Sorry, I didn't find that. Type *menu* to see what we have.`;
    }
  }

  // 4. Confirm
  if (lower.includes("yes confirm") || lower.includes("confirm")) {
    if (store.country === "Nigeria") {
      return `Order confirmed! 🎉\n\nPlease pay to:\nOpay - Peter Oriorowho - 7041574932\n\nSend your receipt to 07041574932\nOur agent will call you shortly to arrange delivery.\nDelivery: Lagos ₦2,000 | Edo ₦1,000\n\nThank you for using Petrux ShopAI.`;
    }
    return `Order confirmed! 🎉\n\nOur agent will call you shortly to arrange delivery.\n\nThank you for using Petrux ShopAI.`;
  }

  // 5. Ask for payment / account
  if (lower.includes("pay") || lower.includes("account") || lower.includes("opay")) {
    if (store.country === "Nigeria") {
      return `Pay with Opay:\nAccount Name: Peter Oriorowho\nAccount Number: 7041574932\n\nAfter payment, send receipt to 07041574932`;
    }
    return `Payment will be via ${store.payment}.`;
  }

  return `Sorry, I didn't understand.\nType *menu* to see products.`;
}

module.exports = { handleMessage };
