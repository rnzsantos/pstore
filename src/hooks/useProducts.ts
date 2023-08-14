import { useQuery } from '@tanstack/react-query';
import Product from '../entities/Product';
import ProductService from '../services/productService';
import ms from 'ms';

const productService = new ProductService<Product>('/products');

const useProducts = (token: string) => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAll(token),
    staleTime: ms('30m'),
    refetchOnWindowFocus: false,
  });
};

export default useProducts;
