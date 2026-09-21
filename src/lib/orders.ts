import type { CartItem } from "@/lib/cart-context";

export type ShippingAddress = {
  first: string;
  last: string;
  street: string;
  zip: string;
  city: string;
  country: string;
};

export type StoredOrder = {
  orderNumber: string;
  createdAt: string; // ISO timestamp
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountLabel: string | null;
  shippingLabel: string;
  shipping: number;
  vat: number;
  total: number;
  email: string;
  phone: string;
  shippingAddress: ShippingAddress;
  etaDays: [number, number]; // [from, to] days after createdAt
};

const ORDER_KEY = "huda-last-order";
const PROMO_KEY = "huda-promo";

export function money(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function generateOrderNumber(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `HUDA-${digits}`;
}

export function saveOrder(order: StoredOrder) {
  try {
    window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  } catch {
    // ignore storage errors
  }
}

export function loadOrder(): StoredOrder | null {
  try {
    const raw = window.localStorage.getItem(ORDER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredOrder;
  } catch {
    return null;
  }
}

export type StoredPromo = { code: string; applied: boolean };

export function savePromo(promo: StoredPromo) {
  try {
    window.localStorage.setItem(PROMO_KEY, JSON.stringify(promo));
  } catch {
    // ignore storage errors
  }
}

export function loadPromo(): StoredPromo | null {
  try {
    const raw = window.localStorage.getItem(PROMO_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredPromo;
  } catch {
    return null;
  }
}

export function clearPromo() {
  try {
    window.localStorage.removeItem(PROMO_KEY);
  } catch {
    // ignore storage errors
  }
}

export function formatDayOffset(isoDate: string, days: number): string {
  const d = new Date(isoDate);
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });
}
