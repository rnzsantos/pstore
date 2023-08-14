import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
} from '@chakra-ui/react';
import { MdAddShoppingCart } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import Product from '../entities/Product';
import useAddToCart from '../hooks/useAddToCart';
import useUserStore from '../stores/userStore';
import { useLoginRequiredToast } from '../utils/toasts';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const user = useUserStore(s => s.user);
  const { mutate: addToCartMutation } = useAddToCart();
  const navigate = useNavigate();
  const loginRequiredToast = useLoginRequiredToast();

  return (
    <Card maxW={{ base: 'full', md: 'sm' }}>
      <Link to={`/products/${product._id}`}>
        <CardBody paddingBottom={0}>
          <Image
            src={product.gameImage}
            width="180px"
            height="240px"
            margin="auto"
            fit="cover"
            rounded="lg"
          />
          <Stack mt={3} height="110px">
            <Heading size="md" fontWeight="bold" color="red.400">
              &#8369;{product.price.toLocaleString()}
            </Heading>
            <Heading size="sm" color="whiteAlpha.700" fontWeight="medium">
              {product.name}
            </Heading>
          </Stack>
        </CardBody>
      </Link>
      <CardFooter paddingTop={0}>
        <Button
          rightIcon={<MdAddShoppingCart />}
          width="full"
          fontWeight="bold"
          color="blackAlpha.800"
          bgColor="yellow.400"
          colorScheme="yellow"
          onClick={() => {
            if (user && !user?.isAdmin) return addToCartMutation({ product });
            navigate('/login');
            loginRequiredToast();
          }}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
