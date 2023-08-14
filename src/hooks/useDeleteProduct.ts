import { useMutation, useQueryClient } from '@tanstack/react-query';
import ProductService from '../services/productService';
import Product from '../entities/Product';

const productService = new ProductService('/products');

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.delete,
    onMutate: id => {
      queryClient.setQueryData<Product[]>(['products'], products =>
        products?.filter(p => p._id !== id)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['activeProducts']);
    },
  });
};

export default useDeleteProduct;
