import { Center, Heading, SimpleGrid, Spinner } from '@chakra-ui/react';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useActiveProducts from '../hooks/useActiveProducts';
import LoadingSpinner from './LoadingSpinner';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useActiveProducts();

  const fetchedGamesCount =
    data?.pages.reduce((total, page) => total + page.items.length, 0) || 0;

  if (isLoading) return <LoadingSpinner />;

  if (fetchedGamesCount === 0)
    return (
      <Center>
        <Heading color="red.500">No game(s) found.</Heading>
      </Center>
    );

  return (
    <InfiniteScroll
      dataLength={fetchedGamesCount}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={isFetchingNextPage && <Spinner size="sm" marginTop={10} />}
      endMessage={
        <Center marginTop={10}>
          <Heading size="sm" color="gray.300">
            No more games to show.
          </Heading>
        </Center>
      }
    >
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={10}>
        {data?.pages?.map((page, index) => (
          <React.Fragment key={index}>
            {page.items.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default ProductList;
