'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CartItem = {
  id: string; // product id or sku
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  // Optional metadata for future use
  brand?: string;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  // selectors
  totalItems: () => number;
  totalPrice: () => number;
  // actions
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeItem: (id: string) => void;
  increase: (id: string, step?: number) => void;
  decrease: (id: string, step?: number) => void;
  setQuantity: (id: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      totalItems: () => get().items.reduce((acc, it) => acc + it.quantity, 0),
      totalPrice: () => get().items.reduce((acc, it) => acc + it.price * it.quantity, 0),
      addItem: (item, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
              ),
              isOpen: true,
            };
          }
          return { items: [...state.items, { ...item, quantity: qty }], isOpen: true };
        }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      increase: (id, step = 1) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity: i.quantity + step } : i)),
        })),
      decrease: (id, step = 1) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity - step) } : i))
            .filter((i) => i.quantity > 0),
        })),
      setQuantity: (id, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, Math.floor(qty)) } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), // don't persist isOpen
    }
  )
);
