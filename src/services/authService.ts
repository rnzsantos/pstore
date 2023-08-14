import { LoginFormData } from '../pages/Login';
import apiClient from './apiClient';

class AuthService<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  loginUser = (data: LoginFormData) => {
    return apiClient.post<T>(this.endpoint, data).then(({ data }) => data);
  };
}

export default new AuthService<string>('/auth');
