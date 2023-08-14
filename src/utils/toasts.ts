import { useToast } from '@chakra-ui/react';

export const useLoginToast = () =>
  useToast({
    title: 'Logged in successfully.',
    status: 'success',
    duration: 3000,
  });

export const useLogoutToast = () =>
  useToast({
    title: 'Logged out successfully.',
    status: 'success',
    duration: 3000,
  });

export const useLoginRequiredToast = () =>
  useToast({
    title: 'Please login to buy.',
    status: 'error',
    duration: 3000,
  });

export const useLoginErrorToast = () =>
  useToast({
    title: 'Invalid email or password.',
    status: 'error',
    duration: 5000,
  });

export const useRegisterSuccessToast = () =>
  useToast({
    title: 'Registration successful.',
    status: 'success',
    duration: 3000,
  });

export const useAddToCartToast = () =>
  useToast({
    title: 'Item added to cart.',
    status: 'success',
    duration: 3000,
  });

export const usePlaceOrderToast = () =>
  useToast({
    title: 'Checkout successful',
    status: 'success',
    duration: 3000,
  });
