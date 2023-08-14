import getToken from '../utils/getToken';
import apiClient from './apiClient';

class OrderService<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  placeOrder = () => {
    return apiClient
      .post(
        this.endpoint,
        {},
        { headers: { Authorization: 'Bearer ' + getToken() } }
      )
      .then(res => res.data);
  };

  getOrders = () => {
    return apiClient
      .get<T>(this.endpoint + '/me', {
        headers: { Authorization: 'Bearer ' + getToken() },
      })
      .then(res => res.data);
  };
}

export default OrderService;
