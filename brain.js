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
    menu += `\nTo order, type: *buy [product name]*\nExample: buy rice 50kg`;
    return menu;
  }

  // 3. Buy something
  if (lower.includes("buy")) {
    const found = store.products.find(p => lower.includes(p.name.toLowerCase().split(" ")[0]));
    if (found) {
      return `Great choice! ✅\n\n*${found.name}* - ${store.symbol}${found.price.toLocaleString()}\n\nTo confirm, reply: *yes confirm*\nPayment will be via ${store.payment}.`;
    } else {
      return `Sorry, I didn't find that. Type *menu* to see what we have.`;
    }
  }

  // 4. Confirm
  if (lower.includes("yes confirm") || lower.includes("confirm")) {
    return `Order confirmed! 🎉\n\nOur agent will call you shortly to arrange delivery.\n\nThank you for using Petrux ShopAI.`;
  }

  return `Sorry, I didn't understand.\nType *menu* to see products.`;
}

module.exports = { handleMessage };
