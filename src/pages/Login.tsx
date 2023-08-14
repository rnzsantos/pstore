import { EmailIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RiLockPasswordFill } from 'react-icons/ri';
import { NavLink, Navigate } from 'react-router-dom';
import { z } from 'zod';
import useAuth from '../hooks/useAuth';
import useUserStore from '../stores/userStore';
import { useLoginErrorToast } from '../utils/toasts';

const LoginFormDataSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required.')
    .email('Must be a valid email.'),
  password: z.string().nonempty('Password is required.'),
});

export type LoginFormData = z.infer<typeof LoginFormDataSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormDataSchema),
  });

  const auth = useAuth();
  const user = useUserStore(s => s.user);
  const loginErrorToast = useLoginErrorToast();

  if (user) return <Navigate to="/" />;

  return (
    <Box maxWidth="400px" margin="auto">
      <Heading size="lg" color="gray.300" marginBottom={5}>
        Sign in
      </Heading>
      <Stack>
        <form
          onSubmit={handleSubmit(data =>
            auth.mutate(data, {
              onError: () => loginErrorToast(),
            })
          )}
        >
          <FormControl id="email" marginBottom={5}>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="gray.500" />
              </InputLeftElement>
              <Input type="text" variant="fill" {...register('email')} />
            </InputGroup>
            {errors.email && (
              <Text fontSize="sm" color="red.500">
                {errors.email.message}
              </Text>
            )}
          </FormControl>

          <FormControl id="password" marginBottom={5}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <RiLockPasswordFill color="gray" />
              </InputLeftElement>
              <Input type="password" variant="fill" {...register('password')} />
            </InputGroup>
            {errors.password && (
              <Text fontSize="sm" color="red.500">
                {errors.password.message}
              </Text>
            )}
          </FormControl>

          <Button
            type="submit"
            colorScheme="orange"
            width="full"
            paddingX={0}
            pointerEvents={auth.isLoading ? 'none' : 'auto'}
          >
            {auth.isLoading && (
              <Progress
                position="absolute"
                hasStripe
                value={64}
                isIndeterminate
                height="full"
                width="full"
                borderRadius="5px"
              />
            )}
            {auth.isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <HStack justify="center" mt="6" fontWeight="semibold">
          <Text marginBottom={0}>Don't have an account?</Text>
          <Link as={NavLink} color="blue.300" to="/register">
            Create account
          </Link>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Login;
