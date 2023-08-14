import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

export interface Item {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subTotal: number;
  gameImage: string;
}

export interface Cart {
  userId: string;
  items: Item[];
  itemsInCart: number;
  totalAmount: number;
}

interface CartStore {
  cart: Cart;
  setCart: (cart: Cart) => void;
}

const useCartStore = create<CartStore>(set => ({
  cart: {} as Cart,
  setCart: cart => set(() => ({ cart })),
}));

if (process.env.NODE_ENV === 'development')
  mountStoreDevtool('Cart Store', useCartStore);

export default useCartStore;
