// stores.js - Price list for Petrux ShopAI
// Nigeria + USA - More countries coming soon

const STORES = {
  NG: {
    country: "Nigeria",
    currency: "NGN",
    symbol: "₦",
    payment: "Paystack",
    products: [
      { name: "Rice 50kg", price: 85000 },
      { name: "Chicken 2kg", price: 12000 },
      { name: "Indomie Carton", price: 18000 },
      { name: "Tomatoes Basket", price: 8000 },
      { name: "Milk Peak", price: 6500 },
    ]
  },
  US: {
    country: "USA",
    currency: "USD",
    symbol: "$",
    payment: "Stripe",
    products: [
      { name: "Rice 20lb", price: 28 },
      { name: "Chicken 2lb", price: 9 },
      { name: "Milk Gallon", price: 4.5 },
      { name: "Eggs 12pcs", price: 3.8 },
      { name: "Bread Loaf", price: 3.2 },
    ]
  }
};

function detectCountry(phone) {
  if (phone.startsWith("234")) return "NG";
  if (phone.startsWith("1")) return "US";
  return "NG";
}

module.exports = { STORES, detectCountry };
