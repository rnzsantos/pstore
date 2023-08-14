import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { Order } from '../hooks/useOrders';

interface Props {
  order: Order;
}

const OrderDetail = ({ order }: Props) => {
  const datePurchased = new Date(order.purchasedOn);

  return (
    <Box>
      <Heading size="sm">
        {datePurchased.toLocaleDateString(undefined, {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        })}
      </Heading>
      <UnorderedList>
        {order.products.map(product => (
          <ListItem key={product._id}>{product.name}</ListItem>
        ))}
      </UnorderedList>
      <Text>Total Amount: {order.totalAmount}</Text>
    </Box>
  );
};

export default OrderDetail;
