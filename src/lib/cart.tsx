import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { bouquets, type Bouquet } from "@/data/bouquets";

export type CartItem = { id: string; quantity: number };

type CartContextValue = {
  items: CartItem[];
  detailedItems: Array<CartItem & { bouquet: Bouquet; subtotal: number }>;
  count: number;
  subtotal: number;
  add: (id: string, quantity?: number) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "blossom-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, hydrated]);

  const add = useCallback((id: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { id, quantity }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const detailedItems = items
      .map((item) => {
        const bouquet = bouquets.find((b) => b.id === item.id);
        if (!bouquet) return null;
        return { ...item, bouquet, subtotal: bouquet.price * item.quantity };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    const count = detailedItems.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = detailedItems.reduce((sum, i) => sum + i.subtotal, 0);

    return { items, detailedItems, count, subtotal, add, remove, setQuantity, clear };
  }, [items, add, remove, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
