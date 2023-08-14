import { useInfiniteQuery } from '@tanstack/react-query';
import ms from 'ms';
import Product from '../entities/Product';
import ProductService from '../services/productService';
import useItemQueryStore from '../stores/itemQueryStore';

interface ResponseData {
  items: Product[];
  totalPages: number;
  currentPage: number;
}

const productService = new ProductService<ResponseData>('/products');

const useActiveProducts = () => {
  const query = useItemQueryStore(s => s.itemQuery);

  return useInfiniteQuery<ResponseData>({
    queryKey: ['activeProducts', query],
    queryFn: ({ pageParam = 1 }) =>
      productService.getAllActive({
        params: {
          name: query.searchText,
          page: pageParam,
          pageSize: '12',
        },
      }),
    refetchOnWindowFocus: false,
    staleTime: ms('1h'),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.items.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};

export default useActiveProducts;
