import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import {
  TCategoryPayload,
  TCategoryResponse,
  TUpdateCategoryPayload,
} from './tyings';

const categoryServices = {
  getCategory: () => {
    return instance.get<SuccessResponse<TCategoryResponse>>(`/category`);
  },
  getCategoryById: (id: string) => {
    return instance.get<SuccessResponse<TCategoryResponse>>(`/category/${id}`);
  },
  createCategory: (payload: TCategoryPayload) => {
    return instance.post<SuccessResponse<TCategoryResponse>>(
      `/category`,
      payload,
    );
  },
  deleteCategory: (id: string) => {
    return instance.delete<SuccessResponse>(`/category/${id}`);
  },
  updateCategory: (payload: TUpdateCategoryPayload) => {
    return instance.put<SuccessResponse<TCategoryResponse>>(
      `/category/${payload.id}`,
      payload.payload,
    );
  },
};

export default categoryServices;
