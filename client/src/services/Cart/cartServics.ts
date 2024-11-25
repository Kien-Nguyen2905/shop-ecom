import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import {
  TDeleteCartResponse,
  TGetCartResponse,
  TRemoveCartPayload,
  TUpdateCartPayload,
  TUpdateCartResponse,
} from './tyings';

const cartServices = {
  getCart: () => {
    return instance.get<SuccessResponse<TGetCartResponse>>(`/cart`);
  },
  updateCart: (payload: TUpdateCartPayload) => {
    return instance.put<SuccessResponse<TUpdateCartResponse>>(`/cart`, payload);
  },
  removeCart: (payload: TRemoveCartPayload) => {
    return instance.delete<SuccessResponse<TDeleteCartResponse>>(`/cart`, {
      data: payload,
    });
  },
};

export default cartServices;
