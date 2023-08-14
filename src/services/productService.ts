import { AxiosRequestConfig } from 'axios';
import { NewProductFormData } from '../components/AddProductModal';
import Product from '../entities/Product';
import apiClient from './apiClient';
import getToken from '../utils/getToken';

class ProductService<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (token: string) => {
    return apiClient
      .get<T[]>(this.endpoint, {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then(res => res.data);
  };

  getAllActive = (config: AxiosRequestConfig) => {
    return apiClient
      .get<T>(this.endpoint + '/active', config)
      .then(res => res.data);
  };

  getOne = (id: string) => {
    return apiClient.get<T>(this.endpoint + `/${id}`).then(res => res.data);
  };

  addProduct = (data: NewProductFormData) => {
    const image = !data.gameImage
      ? 'https://drive.google.com/uc?export=view&id=18GdNroQjNuD3MCfKrjOd2jS9HwYH5PWp'
      : data.gameImage;

    return apiClient
      .post<T>(
        this.endpoint,
        { ...data, gameImage: image },
        {
          headers: { Authorization: 'Bearer ' + getToken() },
        }
      )
      .then(res => res.data);
  };

  updateProduct = (data: Product) => {
    const { _id, isActive, createdOn, gameImage, ...formData } = data;

    return apiClient
      .put<T>(this.endpoint + `/${data._id}`, formData, {
        headers: { Authorization: 'Bearer ' + getToken() },
      })
      .then(res => res.data);
  };

  updateStatus = (id: string) => {
    return apiClient
      .patch(
        this.endpoint + `/${id}/status`,
        {},
        { headers: { Authorization: 'Bearer ' + getToken() } }
      )
      .then(res => res.data);
  };

  delete = (id: string) => {
    return apiClient
      .delete(this.endpoint + `/${id}`, {
        headers: { Authorization: 'Bearer ' + getToken() },
      })
      .then(res => res.data);
  };
}

export default ProductService;
