import { useMutation, useQueryClient } from '@tanstack/react-query';
import Product from '../entities/Product';
import CartService from '../services/cartService';
import { Cart } from '../stores/cartStore';
import { useAddToCartToast } from '../utils/toasts';

const cartService = new CartService<Cart>('/cart');

export interface UpdaterData {
  product: Product;
  quantity?: number;
}

const useAddToCart = () => {
  const queryClient = useQueryClient();
  const addToCartToast = useAddToCartToast();

  return useMutation<Cart, Error, UpdaterData>({
    mutationFn: cartService.addtoCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      addToCartToast();
    },
  });
};

export default useAddToCart;
