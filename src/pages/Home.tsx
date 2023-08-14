import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, Link, useDisclosure } from '@chakra-ui/react';
import { Fragment } from 'react';
import AddProductModal from '../components/AddProductModal';
import Inventory from '../components/Inventory';
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';
import useItemQueryStore from '../stores/itemQueryStore';
import useUserStore from '../stores/userStore';

const Home = () => {
  const user = useUserStore(s => s.user);
  const setText = useItemQueryStore(s => s.setText);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (user && user.isAdmin)
    return (
      <Fragment>
        <AddProductModal isOpen={isOpen} onClose={onClose} />
        <Button colorScheme="teal" leftIcon={<AddIcon />} onClick={onOpen}>
          New Product
        </Button>
        <Box marginY={10}>
          <ProductFilter />
        </Box>
        <Inventory />
      </Fragment>
    );

  return (
    <Fragment>
      <Link
        as={Heading}
        color="gray.200"
        onClick={() => setText('')}
        marginBottom={5}
      >
        All Games
      </Link>
      <ProductList />
    </Fragment>
  );
};

export default Home;
