import {
  CloseButton,
  Flex,
  HStack,
  Text,
  Input,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import useDelete from '../hooks/useDelete';
import useUpdateQuantity from '../hooks/useUpdateQuantity';
import { Item } from '../stores/cartStore';
import CartProductMeta from './CartProductMeta';

interface Props {
  item: Item;
}

const CartItem = ({ item }: Props) => {
  const [selectedItem, setSelectedItem] = useState<Item>(item);
  const updateQuantity = useUpdateQuantity();
  const deleteItem = useDelete();

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-around"
      alignItems="center"
      align="center"
    >
      <CartProductMeta item={item} />

      <Flex
        width="full"
        justify="space-around"
        alignItems="center"
        display={{ base: 'none', md: 'flex' }}
      >
        <Input
          maxW="64px"
          textAlign="center"
          value={selectedItem.quantity}
          focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
          onBlur={() => updateQuantity.mutate(selectedItem)}
          onChange={e =>
            setSelectedItem(prevState => ({
              ...prevState,
              quantity: !e.target.value ? 0 : parseInt(e.target.value),
            }))
          }
        />
        <HStack spacing="1">
          <Text as="span" fontWeight="medium">
            &#8369;
            {item.subTotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </HStack>
        <CloseButton
          aria-label={`Delete ${item.name} from cart`}
          onClick={() => deleteItem.mutate(item.productId)}
        />
      </Flex>

      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-around"
        alignItems="center"
        display={{ base: 'flex', md: 'none' }}
      >
        <Button size="xs" onClick={() => deleteItem.mutate(item.productId)}>
          Remove
        </Button>
        <Input
          maxW="64px"
          textAlign="center"
          value={selectedItem.quantity}
          focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
          onBlur={() => updateQuantity.mutate(selectedItem)}
          onChange={e =>
            setSelectedItem(prevState => ({
              ...prevState,
              quantity: !e.target.value ? 0 : parseInt(e.target.value),
            }))
          }
        />
        <HStack spacing="1">
          <Text as="span" fontWeight="medium">
            {item.subTotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default CartItem;
