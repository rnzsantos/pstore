import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import User from '../entities/User';
import { LoginFormData } from '../pages/Login';
import authService from '../services/authService';
import UserService from '../services/userService';
import useUserStore from '../stores/userStore';
import { useLoginToast } from '../utils/toasts';

const userService = new UserService<User>('/users');

const useAuth = () => {
  const setUser = useUserStore(s => s.setUser);
  const navigate = useNavigate();
  const loginToast = useLoginToast();

  return useMutation<string, Error, LoginFormData>({
    mutationFn: authService.loginUser,
    onSuccess: token => {
      localStorage.setItem('token', token);
      userService.getUserInfo(token).then(user => {
        setUser(user);
        navigate('/');
        loginToast();
      });
    },
  });
};

export default useAuth;
