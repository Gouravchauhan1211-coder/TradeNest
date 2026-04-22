import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  title: string;
  salePrice: number;
  originalPrice: number;
  thumbnail1: string;
  category: string;
  isMembership?: boolean;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const exists = get().items.find(i => i.id === item.id);
        if (!exists) {
          set((state) => ({ items: [...state.items, item] }));
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(i => i.id !== id),
        }));
      },

      clearCart: () => set({ items: [] }),

      isInCart: (id) => !!get().items.find(i => i.id === id),

      total: () => get().items.reduce((acc, item) => acc + item.salePrice, 0),
    }),
    {
      name: 'tradenest-cart',
    }
  )
);
