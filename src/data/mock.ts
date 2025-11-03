export type Product = 'Buffalo Milk' | 'Cow Milk';

export type Customer = {
  id: string;
  name: string;
  product: Product;
  rate: number; // per liter in INR
};

export const PRODUCTS: Record<Product, { price: number }> = {
  'Buffalo Milk': { price: 70 },
  'Cow Milk': { price: 60 },
};

export const CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Nikunj Gami', product: 'Buffalo Milk', rate: 70 },
  { id: 'c2', name: 'Paresh Gami', product: 'Cow Milk', rate: 70 },
  { id: 'c3', name: 'Chetan Gami', product: 'Buffalo Milk', rate: 70 },
  { id: 'c4', name: 'Denis', product: 'Buffalo Milk', rate: 65 },
];

export type DailyEntry = {
  customerId: string;
  product: Product;
  morningLiters: number;
  eveningLiters: number;
};

export const DAILY_ENTRIES: DailyEntry[] = [
  { customerId: 'c1', product: 'Buffalo Milk', morningLiters: 3, eveningLiters: 0 },
  { customerId: 'c2', product: 'Cow Milk', morningLiters: 3.5, eveningLiters: 0 },
  { customerId: 'c3', product: 'Buffalo Milk', morningLiters: 5, eveningLiters: 0 },
  { customerId: 'c4', product: 'Buffalo Milk', morningLiters: 1, eveningLiters: 0 },
];

export function formatINR(n: number) {
  return '₹' + n.toFixed(0);
}

export function litersToAmount(product: Product, liters: number) {
  const price = PRODUCTS[product].price;
  return price * liters;
}

export const PICKUP_PLAN = {
  morning: {
    'Buffalo Milk': 12,
    'Cow Milk': 25,
  } as Record<Product, number>,
  evening: {
    'Buffalo Milk': 15,
    'Cow Milk': 20,
  } as Record<Product, number>,
};

export function getCustomer(id: string) {
  return CUSTOMERS.find(c => c.id === id);
}

export function sumDeliveredByProduct(time: 'morning' | 'evening') {
  const res: Record<Product, number> = { 'Buffalo Milk': 0, 'Cow Milk': 0 };
  for (const e of DAILY_ENTRIES) {
    const l = time === 'morning' ? e.morningLiters : e.eveningLiters;
    res[e.product] += l;
  }
  return res;
}
