import {
  Box,
  Image,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Item } from '../stores/cartStore';

interface Props {
  item: Item;
}

const CartProductMeta = ({ item }: Props) => {
  return (
    <Stack direction="row" spacing="5" width="full">
      <Image
        rounded="lg"
        width="110px"
        height="150px"
        fit="cover"
        src={item.gameImage}
        alt={item.name}
        draggable="false"
        loading="lazy"
      />
      <Box pt="4">
        <Stack spacing="0.5">
          <Link to={`/products/${item.productId}`}>
            <Text fontWeight="medium">{item.name}</Text>
          </Link>
          <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
            &#8369;
            {item.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};

export default CartProductMeta;
