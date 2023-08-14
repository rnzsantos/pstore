import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useAddProduct from '../hooks/useAddProduct';
import Product from '../entities/Product';

const NewProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Name must contain at least 1 character')
    .max(100, 'Name must contain at most 100 characters'),
  description: z
    .string()
    .min(1, 'Description must contain at least 1 character'),
  price: z
    .number({ invalid_type_error: 'Price is required ' })
    .min(0.01, 'Price must be greater than or equal to 0.01')
    .max(250_000, 'Price must be less than or equal to 250000'),
  stocks: z
    .number({ invalid_type_error: 'Quantity is required ' })
    .min(1, 'Quantity must be greater than or equal to 1')
    .max(999, 'Quantity must be less than or equal to 999'),
  gameImage: z.string(),
});

export type NewProductFormData = z.infer<typeof NewProductSchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal = ({ isOpen, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(NewProductSchema),
  });

  const addProduct = useAddProduct();
  const toast = useToast({
    title: 'Product successfully added.',
    status: 'success',
    duration: 3000,
  });

  return (
    <Modal isCentered={true} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Product Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form
            onSubmit={handleSubmit(data => {
              // const { gameImage, ...formData } = data
              addProduct.mutate(data);
              reset();
              toast();
            })}
          >
            <FormControl marginBottom={3} id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" {...register('name')} />
              {errors.name && <Text color="tomato">{errors.name.message}</Text>}
            </FormControl>

            <FormControl marginBottom={3} id="description">
              <FormLabel>Description</FormLabel>
              <Textarea rows={5} resize="none" {...register('description')} />
              {errors.description && (
                <Text color="tomato">{errors.description.message}</Text>
              )}
            </FormControl>

            <FormControl marginBottom={3} id="price">
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                {...register('price', { valueAsNumber: true })}
              />
              {errors.price && (
                <Text color="tomato">{errors.price.message}</Text>
              )}
            </FormControl>

            <FormControl id="stocks" marginBottom={3}>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                {...register('stocks', { valueAsNumber: true })}
              />
              {errors.stocks && (
                <Text color="tomato">{errors.stocks.message}</Text>
              )}
            </FormControl>

            <FormControl id="gameImage">
              <FormLabel>Image Link</FormLabel>
              <Input type="text" {...register('gameImage')} />
            </FormControl>

            <Button type="submit" colorScheme="blue" marginY={5}>
              Save
            </Button>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;
