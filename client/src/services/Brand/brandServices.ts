import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import {
  TBrandPayload,
  TBrandResponse,
  TCreateBrandResponse,
  TUpdateBrandPayload,
  TUpdateBrandResponse,
} from './tyings';

const brandServices = {
  getBrand: () => {
    return instance.get<SuccessResponse<TBrandResponse>>(`/brand`);
  },
  createBrand: (payload: TBrandPayload) => {
    return instance.post<SuccessResponse<TCreateBrandResponse>>(
      `/brand`,
      payload,
    );
  },
  deleteBrand: (id: string) => {
    return instance.delete<SuccessResponse>(`/brand/${id}`);
  },
  updateBrand: (payload: TUpdateBrandPayload) => {
    return instance.put<SuccessResponse<TUpdateBrandResponse>>(
      `/brand/${payload.id}`,
      payload.payload,
    );
  },
};

export default brandServices;
