import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import OrderService from '../services/orderService';
import { usePlaceOrderToast } from '../utils/toasts';

const orderService = new OrderService('/orders');

const usePlaceOrder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const placeOrderToast = usePlaceOrderToast();

  return useMutation({
    mutationFn: orderService.placeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate('/orders');
      placeOrderToast();
    },
  });
};

export default usePlaceOrder;
