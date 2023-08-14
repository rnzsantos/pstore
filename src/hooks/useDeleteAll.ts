import { useMutation, useQueryClient } from '@tanstack/react-query';
import CartService from '../services/cartService';

const cartService = new CartService('/cart');

const useDeleteAll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.removeAll,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export default useDeleteAll;
