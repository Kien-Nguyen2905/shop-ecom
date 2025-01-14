import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import {
  TCategory,
  TCategoryPayload,
  TCategoryResponse,
  TUpdateCategoryPayload,
} from './tyings';

const categoryServices = {
  getCategory: () => {
    return instance.get<SuccessResponse<TCategoryResponse>>(`/category`);
  },
  getCategoryById: (id: string) => {
    return instance.get<SuccessResponse<TCategory>>(`/category/${id}`);
  },
  createCategory: (payload: TCategoryPayload) => {
    return instance.post<SuccessResponse<TCategory>>(`/category`, payload);
  },
  deleteCategory: (id: string) => {
    return instance.delete<SuccessResponse>(`/category/${id}`);
  },
  updateCategory: (payload: TUpdateCategoryPayload) => {
    return instance.put<SuccessResponse<TCategory>>(
      `/category/${payload.id}`,
      payload.payload,
    );
  },
};

export default categoryServices;
