import { RegisterFormData } from '../pages/Register';
import apiClient from './apiClient';

class UserService<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getUserInfo = (token: string) => {
    return apiClient
      .get<T>(this.endpoint + '/me', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(res => res.data);
  };

  registerUser = (data: RegisterFormData) => {
    return apiClient.post<T>(this.endpoint, data).then(res => res.data);
  };
}

export default UserService;
