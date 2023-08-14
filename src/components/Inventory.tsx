import {
  Box,
  ButtonGroup,
  Icon,
  IconButton,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import {
  BsArchive,
  BsFillTrash2Fill,
  BsGearFill,
  BsSave,
} from 'react-icons/bs';
import { MdOutlineUnarchive } from 'react-icons/md';
import Product from '../entities/Product';
import useDeleteProduct from '../hooks/useDeleteProduct';
import useProducts from '../hooks/useProducts';
import useUpdateProduct from '../hooks/useUpdateProduct';
import useUpdateStatus from '../hooks/useUpdateStatus';
import useProductQueryStore from '../stores/productQueryStore';
import getToken from '../utils/getToken';
import LoadingSpinner from './LoadingSpinner';

const Inventory = () => {
  const { data: products, isLoading } = useProducts(getToken());
  const isActive = useProductQueryStore(s => s.isActive);
  const { mutate } = useUpdateStatus();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const [selectedItem, setSelectedItem] = useState<Product>({} as Product);

  const displayedProducts =
    isActive !== null
      ? products?.filter(p => p.isActive === isActive)
      : products;

  const toggle = (product: Product) => mutate(product._id!);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedItem(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Price</Th>
            <Th>Stocks</Th>
            <Th textAlign="center">Status</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {displayedProducts?.map(product => (
            <Tr key={product._id}>
              <Td>
                {product._id === selectedItem?._id ? (
                  <Input
                    name="name"
                    value={selectedItem?.name}
                    onChange={handleChange}
                  />
                ) : (
                  product.name.substring(0, 25)
                )}
              </Td>
              <Td>
                {product._id === selectedItem._id ? (
                  <Textarea
                    name="description"
                    value={selectedItem.description}
                    onChange={handleChange}
                  />
                ) : (
                  product.description.substring(0, 25)
                )}
              </Td>
              <Td>
                {product._id === selectedItem._id ? (
                  <Input
                    name="price"
                    type="number"
                    value={selectedItem.price}
                    onChange={handleChange}
                  />
                ) : (
                  product.price
                )}
              </Td>
              <Td>
                {product._id === selectedItem._id ? (
                  <Input
                    name="stocks"
                    type="number"
                    value={selectedItem.stocks}
                    onChange={handleChange}
                  />
                ) : (
                  product.stocks
                )}
              </Td>
              <Td>
                <Box textAlign="center">
                  <Icon
                    boxSize={6}
                    color={product.isActive ? 'green.500' : 'red.500'}
                    as={
                      product.isActive ? AiFillCheckCircle : AiFillCloseCircle
                    }
                  />
                </Box>
              </Td>
              <Td>
                <ButtonGroup variant="outline" spacing="5">
                  {product._id !== selectedItem._id && (
                    <IconButton
                      color="gray.500"
                      icon={<BsGearFill />}
                      aria-label="Edit product"
                      onClick={() => {
                        setSelectedItem(product);
                      }}
                    />
                  )}

                  {product._id === selectedItem._id && (
                    <IconButton
                      icon={<BsSave />}
                      aria-label="Save product"
                      onClick={() => {
                        setSelectedItem({} as Product);
                        updateProduct(selectedItem);
                      }}
                    />
                  )}

                  <IconButton
                    color="yellow.500"
                    icon={
                      product.isActive ? <BsArchive /> : <MdOutlineUnarchive />
                    }
                    aria-label="Arhive or activate product"
                    onClick={() => toggle(product)}
                  />
                  <IconButton
                    color="red.500"
                    icon={<BsFillTrash2Fill />}
                    aria-label="Delete product"
                    onClick={() => deleteProduct(product._id!)}
                  />
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Inventory;
