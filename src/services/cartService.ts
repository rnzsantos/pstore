import { UpdaterData } from '../hooks/useAddToCart';
import { Item } from '../stores/cartStore';
import getToken from '../utils/getToken';
import apiClient from './apiClient';

class CartService<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  checkCart = () => {
    return apiClient
      .get<T>(this.endpoint + '/items', {
        headers: { Authorization: 'Bearer ' + getToken() },
      })
      .then(res => res.data);
  };

  addtoCart = (data: UpdaterData) => {
    return apiClient
      .post<T>(
        this.endpoint + '/items',
        { productId: data.product._id, quantity: data.quantity },
        { headers: { Authorization: 'Bearer ' + getToken() } }
      )
      .then(res => res.data);
  };

  updateQuantity = (data: Item) => {
    return apiClient
      .patch(this.endpoint + `/items/${data.productId}/quantity`, data, {
        headers: { Authorization: 'Bearer ' + getToken() },
      })
      .then(res => res.data);
  };

  removeAll = () => {
    return apiClient
      .delete(this.endpoint + '/items/all', {
        headers: { Authorization: 'Bearer ' + getToken() },
      })
      .then(res => res.data);
  };

  remove = (id: string) => {
    return apiClient
      .delete(this.endpoint + `/items/${id}`, {
        headers: { Authorization: 'Bearer ' + getToken() },
      })
      .then(res => res.data);
  };
}

export default CartService;
