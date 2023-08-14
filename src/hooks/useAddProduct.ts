import { useMutation, useQueryClient } from '@tanstack/react-query';
import Product from '../entities/Product';
import ProductService from '../services/productService';

const productService = new ProductService<Product>('/products');

const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, Product>({
    mutationFn: productService.addProduct,
    onMutate: newProduct => {
      queryClient.setQueryData<Product[]>(['products'], (products = []) => [
        ...products,
        { _id: '0', ...newProduct, isActive: true },
      ]);
    },
    onSuccess: savedProduct => {
      queryClient.setQueryData<Product[]>(['products'], products =>
        products?.map(p => (p._id === '0' ? savedProduct : p))
      );

      queryClient.invalidateQueries(['activeProducts']);
    },
  });
};

export default useAddProduct;
