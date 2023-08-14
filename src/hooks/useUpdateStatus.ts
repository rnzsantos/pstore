import { useMutation, useQueryClient } from '@tanstack/react-query';
import Product from '../entities/Product';
import ProductService from '../services/productService';

interface UpdateStatusContext {
  prevProducts: Product[];
}

const productService = new ProductService('/products');

const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, string, UpdateStatusContext>({
    mutationFn: productService.updateStatus,
    onMutate: id => {
      const prevProducts =
        queryClient.getQueryData<Product[]>(['products']) || [];

      queryClient.setQueryData<Product[]>(['products'], products =>
        products?.map(p => (p._id === id ? { ...p, isActive: !p.isActive } : p))
      );

      return { prevProducts };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['activeProducts']);
    },
    onError: (_err, _var, context) => {
      queryClient.setQueryData<Product[]>(['products'], context?.prevProducts);
    },
  });
};

export default useUpdateStatus;
