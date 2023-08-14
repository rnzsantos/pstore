import { useMutation, useQueryClient } from '@tanstack/react-query';
import CartService from '../services/cartService';
import { Cart, Item } from '../stores/cartStore';

const cartService = new CartService<Cart>('/cart');

const useUpdateQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation<Cart, Error, Item>({
    mutationFn: cartService.updateQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export default useUpdateQuantity;
