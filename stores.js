// stores.js - WORLDWIDE Price list for Petrux ShopAI

const STORES = {
  NG: { country: "Nigeria", currency: "NGN", symbol: "₦", payment: "Opay", account_name: "Peter Oriorowho", account_number: "7041574932", phone: "07041574932", delivery: { Lagos: 2000, Edo: 1000 }, products: [
    { name: "Rice 1 Bag", price: 68000 },
    { name: "Cow Meat 1kg", price: 8500 },
    { name: "Chicken Whole", price: 13500 },
    { name: "Indomie Belleful", price: 1100 },
    { name: "Indomie Superpack", price: 600 },
    { name: "Indomie Indomitable", price: 400 },
    { name: "Beans 1kg", price: 2000 },
    { name: "Garri 1kg", price: 1500 },
    { name: "Vegetable Oil 1L", price: 3800 },
    { name: "Tomatoes 1kg", price: 2000 },
    { name: "Onions 1kg", price: 1800 },
    { name: "Yam Tuber", price: 3500 },
    { name: "Plantain Bunch", price: 6500 },
    { name: "Spaghetti 500g", price: 2200 },
    { name: "Frozen Turkey 1kg", price: 9500 },
    { name: "Frozen Fish 1kg", price: 7500 },
    { name: "Eggs Crate", price: 6500 },
    { name: "Maggi Pack", price: 1800 },
    { name: "Salt 1kg", price: 1200 },
    { name: "Palm Oil 1L", price: 4500 },
    { name: "Fresh Pepper 1kg", price: 3000 },
    { name: "Groundnut 1kg", price: 3200 },
    { name: "Semovita 2kg", price: 5500 },
    { name: "Flour 1kg", price: 2800 },
    { name: "Milk Tin", price: 3200 },
    { name: "Sugar 1kg", price: 2500 },
    { name: "Milo Pack", price: 4000 },
    { name: "Bread Loaf", price: 2500 },
    { name: "Butter", price: 4200 },
    { name: "Soft Drinks Pack", price: 6000 },
  ]},
  US: { country: "USA", currency: "USD", symbol: "$", payment: "Stripe", products: [
    { name: "Rice 20lb", price: 28 },
    { name: "Chicken 2lb", price: 9 },
    { name: "Milk Gallon", price: 4.5 },
    { name: "Eggs 12pcs", price: 3.8 },
    { name: "Bread Loaf", price: 3.2 },
  ]},
  GB: { country: "UK", currency: "GBP", symbol: "£", payment: "Stripe", products: [
    { name: "Rice 10kg", price: 15 },
    { name: "Chicken 2kg", price: 8 },
    { name: "Milk 2L", price: 2.5 },
    { name: "Eggs 12pcs", price: 2.8 },
    { name: "Bread Loaf", price: 1.5 },
  ]},
  GH: { country: "Ghana", currency: "GHS", symbol: "GH₵", payment: "Paystack", products: [
    { name: "Rice 50kg", price: 850 },
    { name: "Chicken 2kg", price: 180 },
    { name: "Milk Peak", price: 85 },
    { name: "Eggs Crate", price: 95 },
    { name: "Bread Loaf", price: 35 },
  ]},
  CA: { country: "Canada", currency: "CAD", symbol: "$", payment: "Stripe", products: [
    { name: "Rice 20lb", price: 35 },
    { name: "Chicken 2kg", price: 14 },
    { name: "Milk 4L", price: 6 },
    { name: "Eggs 12pcs", price: 5 },
    { name: "Bread Loaf", price: 4 },
  ]},
  KE: { country: "Kenya", currency: "KES", symbol: "KSh", payment: "M-Pesa", products: [
    { name: "Rice 10kg", price: 1800 },
    { name: "Chicken 2kg", price: 950 },
    { name: "Milk 1L", price: 180 },
    { name: "Eggs Crate", price: 650 },
    { name: "Bread Loaf", price: 90 },
  ]},
  ZA: { country: "South Africa", currency: "ZAR", symbol: "R", payment: "Stripe", products: [
    { name: "Rice 10kg", price: 280 },
    { name: "Chicken 2kg", price: 150 },
    { name: "Milk 2L", price: 45 },
    { name: "Eggs 18pcs", price: 65 },
    { name: "Bread Loaf", price: 25 },
  ]},
  IN: { country: "India", currency: "INR", symbol: "₹", payment: "Razorpay", products: [
    { name: "Rice 10kg", price: 650 },
    { name: "Chicken 1kg", price: 220 },
    { name: "Milk 1L", price: 60 },
    { name: "Eggs 12pcs", price: 85 },
    { name: "Bread Loaf", price: 40 },
  ]},
  // WORLDWIDE FALLBACK - For any other country
  WORLD: { country: "Worldwide", currency: "USD", symbol: "$", payment: "Stripe / PayPal", products: [
    { name: "Rice 10kg", price: 22 },
    { name: "Chicken 2kg", price: 12 },
    { name: "Milk 1L", price: 2.5 },
    { name: "Eggs 12pcs", price: 3.5 },
    { name: "Bread Loaf", price: 2.8 },
  ]},
};

function detectCountry(phone) {
  if (!phone) return "WORLD";
  const p = phone.replace("+", "");
  if (p.startsWith("234")) return "NG";
  if (p.startsWith("1")) return "US";
  if (p.startsWith("44")) return "GB";
  if (p.startsWith("233")) return "GH";
  if (p.startsWith("254")) return "KE";
  if (p.startsWith("27")) return "ZA";
  if (p.startsWith("91")) return "IN";
  if (p.startsWith("1")) return "CA";
  return "WORLD";
}

module.exports = { STORES, detectCountry };
