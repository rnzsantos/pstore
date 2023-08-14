import { useQuery } from '@tanstack/react-query';
import ProductService from '../services/productService';
import Product from '../entities/Product';
import ms from 'ms';

const productService = new ProductService<Product>('/products');

const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ['products', id],
    queryFn: () => productService.getOne(id!),
    staleTime: ms('5m'),
    refetchOnWindowFocus: false,
  });
};

export default useProduct;
