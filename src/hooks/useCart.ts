import { useQuery } from '@tanstack/react-query';
import CartService from '../services/cartService';
import { Cart } from '../stores/cartStore';

const cartService = new CartService<Cart>('/cart');

const useCart = () =>
  useQuery<Cart, Error>({
    queryKey: ['cart'],
    queryFn: cartService.checkCart,
    retry: false,
    refetchOnWindowFocus: false,
  });

export default useCart;
