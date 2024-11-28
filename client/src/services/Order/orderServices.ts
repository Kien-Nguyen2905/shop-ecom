import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import {
  TCreateOrderPayload,
  TCreateOrderResponse,
  TOrderResponse,
} from './tyings';

const orderServices = {
  createOrder: (payload: TCreateOrderPayload) => {
    return instance.post<SuccessResponse<TCreateOrderResponse>>(
      `/order`,
      payload,
    );
  },
  getOrder: () => {
    return instance.get<SuccessResponse<TOrderResponse>>(`/order`);
  },
};
export default orderServices;
