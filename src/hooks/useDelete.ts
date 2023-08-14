import { useMutation, useQueryClient } from '@tanstack/react-query';
import CartService from '../services/cartService';

const cartService = new CartService('/cart');

const useDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export default useDelete;
