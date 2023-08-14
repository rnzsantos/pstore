import {
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { NavLink, Navigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CartOrderSummary from '../components/CartOrderSummary';
import LoadingSpinner from '../components/LoadingSpinner';
import useCart from '../hooks/useCart';
import useUserStore from '../stores/userStore';

const Cart = () => {
  const user = useUserStore(s => s.user);
  const { data: cart, isLoading } = useCart();
  const totalItems = cart?.itemsInCart;

  if (!user || user?.isAdmin) return <Navigate to="/" />;

  if (isLoading) return <LoadingSpinner />;

  if (!cart?.items)
    return (
      <Center>
        <Heading>Your cart is empty.</Heading>
      </Center>
    );

  return (
    <Box
      maxW={{ base: '3xl', lg: '7xl' }}
      mx="auto"
      py={{ base: '6', md: '8', lg: '12' }}
    >
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        align={{ lg: 'flex-start' }}
        spacing={{ base: '8', md: '16' }}
      >
        <Stack spacing={{ base: '8', md: '10' }} flex="2">
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </Heading>

          <Stack spacing="6">
            {cart?.items.map(item => (
              <CartItem key={item.productId} item={item} />
            ))}
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary cart={cart} />
          <HStack mt="6" fontWeight="semibold">
            <Text marginBottom={0}>or</Text>
            <Link as={NavLink} color="blue.300" to="/">
              Continue shopping
            </Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Cart;
