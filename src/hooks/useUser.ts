import { useQuery } from '@tanstack/react-query';
import UserService from '../services/userService';
import User from '../entities/User';

const userService = new UserService<User>('/users');

const useUser = (token: string) => {
  return useQuery<User>({
    queryKey: ['user', token],
    queryFn: () => userService.getUserInfo(token),
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useUser;
