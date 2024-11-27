import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import { TCreateOrderPayload, TCreateOrderResponse } from './tyings';

const orderServices = {
  createOrder: (payload: TCreateOrderPayload) => {
    return instance.post<SuccessResponse<TCreateOrderResponse>>(
      `/order`,
      payload,
    );
  },
};
export default orderServices;
