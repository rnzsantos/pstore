import { useMutation, useQueryClient } from '@tanstack/react-query';
import Product from '../entities/Product';
import ProductService from '../services/productService';

const productService = new ProductService<Product>('/products');

const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, Product>({
    mutationFn: productService.updateProduct,
    onMutate: updatedProduct => {
      queryClient.setQueryData<Product[]>(['products'], products =>
        products?.map(p => (p._id === updatedProduct._id ? updatedProduct : p))
      );

      queryClient.setQueryData<Product>(
        ['products', updatedProduct._id],
        () => updatedProduct
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['activeProducts']);
    },
  });
};

export default useUpdateProduct;
