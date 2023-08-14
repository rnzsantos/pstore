import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { BsCartCheck } from 'react-icons/bs';
import usePlaceOrder from '../hooks/usePlaceOrder';
import { Cart } from '../stores/cartStore';

interface Props {
  cart: Cart;
}

const CartOrderSummary = ({ cart }: Props) => {
  const amountConfig = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  const { mutate: placeOrderMutation } = usePlaceOrder();
  const tax = cart.totalAmount * 0.02;
  const totalBeforeTax = cart.totalAmount.toLocaleString(
    undefined,
    amountConfig
  );
  const taxAmount = tax.toLocaleString(undefined, amountConfig);
  const total = (cart.totalAmount + tax).toLocaleString(
    undefined,
    amountConfig
  );

  return (
    <Stack spacing="4" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <Flex justifyContent="space-between" fontSize="sm">
          <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
            Items ({cart.itemsInCart}):
          </Text>
          <Text fontWeight="medium">&#8369;{totalBeforeTax}</Text>
        </Flex>

        <Flex justifyContent="space-between" fontSize="sm">
          <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
            Tax (2%):
          </Text>
          <Text fontWeight="medium">&#8369;{taxAmount}</Text>
        </Flex>

        <Flex justifyContent="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            &#8369;{total}
          </Text>
        </Flex>
      </Stack>
      <Button
        colorScheme="blue"
        size="lg"
        fontSize="md"
        rightIcon={<BsCartCheck />}
        onClick={() => placeOrderMutation()}
      >
        Check Out
      </Button>
    </Stack>
  );
};

export default CartOrderSummary;
