import { Button, HStack, Input, Text } from '@chakra-ui/react';
import { Fragment, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../entities/Product';
import useAddToCart from '../hooks/useAddToCart';
import useUserStore from '../stores/userStore';
import { MdAddShoppingCart } from 'react-icons/md';
import { useLoginRequiredToast } from '../utils/toasts';

interface Props {
  product: Product;
}

const ProductOption = ({ product }: Props) => {
  const user = useUserStore(s => s.user);
  const { mutate: addToCartMutation } = useAddToCart();
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const loginRequiredToast = useLoginRequiredToast();

  return (
    <Fragment>
      <HStack alignItems="baseline">
        <Text fontSize="lg" color="gray.400" marginRight={10}>
          Price:
        </Text>
        <Text fontSize="3xl" fontWeight="bold" color="red.400">
          &#8369;{product.price.toLocaleString()}
        </Text>
      </HStack>
      <HStack alignItems="baseline">
        <Text fontSize="lg" color="gray.400" marginRight={7}>
          Stocks:
        </Text>
        <Text fontSize="xl">{product.stocks}</Text>
      </HStack>
      <HStack alignItems="baseline">
        <Text fontSize="lg" color="gray.400" marginRight={3}>
          Quantity:
        </Text>
        <Input
          type="number"
          ref={ref}
          textAlign="center"
          width="80px"
          defaultValue="1"
        />
      </HStack>
      <Button
        rightIcon={<MdAddShoppingCart />}
        width="full"
        fontWeight="bold"
        color="blackAlpha.800"
        bgColor="yellow.400"
        colorScheme="yellow"
        size="lg"
        marginTop={5}
        onClick={() => {
          if (user && !user?.isAdmin)
            return addToCartMutation({
              product,
              quantity: parseInt(ref.current?.value!) || 1,
            });

          navigate('/login');
          loginRequiredToast();
        }}
      >
        Add to cart
      </Button>
    </Fragment>
  );
};

export default ProductOption;
