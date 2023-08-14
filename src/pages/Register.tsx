import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { NavLink, Navigate } from 'react-router-dom';
import { z } from 'zod';
import useRegister from '../hooks/useRegister';
import useUserStore from '../stores/userStore';
import LoadingSpinner from '../components/LoadingSpinner';

const RegisterFormSchema = z
  .object({
    name: z.string().nonempty('Name is required.'),
    email: z
      .string()
      .nonempty('Email is required.')
      .email('Must be a valid email.'),
    password: z
      .string()
      .min(6, 'Password must contain at least 6 character(s)')
      .nonempty('Password is required.'),
    confirmPassword: z
      .string()
      .nonempty('Confirm password is required.')
      .optional(),
    address: z
      .string()
      .nonempty('Address is required.')
      .min(10, 'Address must contain at least 10 character(s)'),
    phone: z
      .string()
      .length(11, 'Phone number must be 11 digits.')
      .regex(/^09\d{9}$/, 'Invalid phone number.'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const registerUser = useRegister();
  const user = useUserStore(s => s.user);

  if (user) return <Navigate to="/" />;

  if (registerUser.isLoading) return <LoadingSpinner />;

  return (
    <Box maxWidth="400px" margin="auto">
      <Heading size="lg" color="gray.300" marginBottom={5}>
        Create new account
      </Heading>
      <Form
        onSubmit={handleSubmit(data => {
          const { confirmPassword, ...formData } = data;
          registerUser.mutate(formData);
        })}
      >
        <FormControl id="email" marginBottom={5} isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="text" variant="fill" {...register('email')} />
          <FormHelperText>We'll never share your email.</FormHelperText>
          {errors.email && (
            <Text fontSize="sm" color="red.500">
              {errors.email?.message}
            </Text>
          )}
        </FormControl>
        <FormControl id="password" marginBottom={5} isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" variant="fill" {...register('password')} />
          {errors.password && (
            <Text fontSize="sm" color="red.500">
              {errors.password?.message}
            </Text>
          )}
        </FormControl>
        <FormControl id="confirmPassword" marginBottom={5} isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            variant="fill"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <Text fontSize="sm" color="red.500">
              {errors.confirmPassword?.message}
            </Text>
          )}
        </FormControl>
        <FormControl id="name" marginBottom={5} isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" variant="fill" {...register('name')} />
          {errors.name && (
            <Text fontSize="sm" color="red.500">
              {errors.name?.message}
            </Text>
          )}
        </FormControl>
        <FormControl id="address" marginBottom={5} isRequired>
          <FormLabel>Address</FormLabel>
          <Input type="text" variant="fill" {...register('address')} />
          {errors.address && (
            <Text fontSize="sm" color="red.500">
              {errors.address?.message}
            </Text>
          )}
        </FormControl>
        <FormControl id="phone" marginBottom={5} isRequired>
          <FormLabel>Phone</FormLabel>
          <Input type="text" variant="fill" {...register('phone')} />
          {errors.phone && (
            <Text fontSize="sm" color="red.500">
              {errors.phone?.message}
            </Text>
          )}
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">
          Register
        </Button>
      </Form>
      <HStack justify="center" mt="6" fontWeight="semibold">
        <Text marginBottom={0}>Already have an account?</Text>
        <Link as={NavLink} color="blue.300" to="/login">
          Sign In
        </Link>
      </HStack>
    </Box>
  );
};

export default Register;
