import { Center, Heading, Stack } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import OrderDetail from '../components/OrderDetail';
import useOrders from '../hooks/useOrders';
import useUserStore from '../stores/userStore';

const Orders = () => {
  const user = useUserStore(s => s.user);
  const { data: orders, isLoading } = useOrders();

  if (!user || user?.isAdmin) return <Navigate to="/" />;

  if (isLoading) return <LoadingSpinner />;

  if (!orders)
    return (
      <Center>
        <Heading>Order list is empty.</Heading>
      </Center>
    );

  return (
    <Stack spacing={5}>
      {orders?.map(order => (
        <OrderDetail key={order._id} order={order} />
      ))}
    </Stack>
  );
};

export default Orders;
