import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import {
  TCreateProductPayload,
  TCreateProductResponse,
  TProductByIdResponse,
  TProductResponse,
  TUpdateProductPayload,
} from './tyings';

const productServices = {
  getProduct: (queryString: string = '') => {
    return instance.get<SuccessResponse<TProductResponse>>(
      `/product${queryString ? `${queryString}` : ''}`,
    );
  },
  getProductById: (id: string | undefined) => {
    return instance.get<SuccessResponse<TProductByIdResponse>>(
      `/product/${id}`,
    );
  },
  createProduct: (payload: TCreateProductPayload) => {
    return instance.post<SuccessResponse<TCreateProductResponse>>(
      `/product`,
      payload,
    );
  },
  deleteProduct: (id: string) => {
    return instance.delete<SuccessResponse>(`/product/${id}`);
  },
  updateCategory: (id: string, payload: TUpdateProductPayload) => {
    return instance.put<SuccessResponse<TCreateProductResponse>>(
      `/product/${id}`,
      payload,
    );
  },
};

export default productServices;
