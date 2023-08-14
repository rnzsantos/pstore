import { useQuery } from '@tanstack/react-query';
import Product from '../entities/Product';
import OrderService from '../services/orderService';

export interface Order {
  _id: string;
  userId: string;
  name: string;
  address: string;
  phone: string;
  products: Product[];
  totalItems: number;
  totalAmount: number;
  purchasedOn: Date;
}

const orderService = new OrderService<Order[]>('/orders');

const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: orderService.getOrders,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export default useOrders;
