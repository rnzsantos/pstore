import {
  Divider,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
} from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import ExpandableText from '../components/ExpandableText';
import ProductOption from '../components/ProductOption';
import useProduct from '../hooks/useProduct';
import useUserStore from '../stores/userStore';

const ProductDetails = () => {
  const params = useParams();
  const user = useUserStore(s => s.user);
  const { data: product } = useProduct(params.id!);

  if (user?.isAdmin) return <Navigate to="/" />;

  if (product)
    return (
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
        <GridItem marginBottom={5}>
          <Image src={product.gameImage} rounded="lg" fit="cover" />
        </GridItem>
        <GridItem>
          <Heading marginBottom={5}>{product.name}</Heading>
          <ExpandableText>{product.description}</ExpandableText>
          <Divider orientation="horizontal" />
          <ProductOption product={product} />
        </GridItem>
      </SimpleGrid>
    );
};

export default ProductDetails;
