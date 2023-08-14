import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import User from '../entities/User';
import { RegisterFormData } from '../pages/Register';
import UserService from '../services/userService';
import { useRegisterSuccessToast } from '../utils/toasts';

const userService = new UserService<User>('/users');

const useRegister = () => {
  const navigate = useNavigate();
  const registerSuccessToast = useRegisterSuccessToast();

  return useMutation<User, Error, RegisterFormData>({
    mutationFn: userService.registerUser,
    onSuccess: () => {
      navigate('/login');
      registerSuccessToast();
    },
  });
};

export default useRegister;
