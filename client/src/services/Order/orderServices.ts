import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import {
  TCreateOrderPayload,
  TCreateOrderResponse,
  TOrderAllResponse,
  TOrderResponse,
  TUpdateStatusOrder,
  TUpdateStatusOrderDetail,
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
  getAllOrder: () => {
    return instance.get<SuccessResponse<TOrderAllResponse>>(`/order/all`);
  },
  updateStatus: (payload: TUpdateStatusOrder) => {
    return instance.put<SuccessResponse<TUpdateStatusOrderDetail>>(
      `/order`,
      payload,
    );
  },
  cancelOrder: (query: string) => {
    return instance.put<SuccessResponse<TCreateOrderResponse>>(
      `/order${query ? `/${query}` : ''}`,
    );
  },
};
export default orderServices;
