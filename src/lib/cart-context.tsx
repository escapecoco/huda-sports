"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  size: string;
  color: string;
  image: string;
  focus: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (slug: string, size: string, color: string) => void;
  setQty: (slug: string, size: string, color: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "huda-cart";

function lineKey(slug: string, size: string, color: string) {
  return `${slug}__${size}__${color}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage, not a React data source
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota/storage errors
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const key = lineKey(item.slug, item.size, item.color);
      const existing = prev.find(
        (p) => lineKey(p.slug, p.size, p.color) === key
      );
      if (existing) {
        return prev.map((p) =>
          lineKey(p.slug, p.size, p.color) === key
            ? { ...p, qty: p.qty + qty }
            : p
        );
      }
      return [...prev, { ...item, qty }];
    });
  }, []);

  const removeItem = useCallback((slug: string, size: string, color: string) => {
    const key = lineKey(slug, size, color);
    setItems((prev) => prev.filter((p) => lineKey(p.slug, p.size, p.color) !== key));
  }, []);

  const setQty = useCallback(
    (slug: string, size: string, color: string, qty: number) => {
      const key = lineKey(slug, size, color);
      setItems((prev) =>
        prev.map((p) =>
          lineKey(p.slug, p.size, p.color) === key
            ? { ...p, qty: Math.max(1, qty) }
            : p
        )
      );
    },
    []
  );

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.qty * i.price, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, count, subtotal, addItem, removeItem, setQty, clear }),
    [items, count, subtotal, addItem, removeItem, setQty, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
