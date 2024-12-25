import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import {
  TCreateTransactionPayload,
  TTransactionAllResponse,
  TTransactionResponse,
} from './tyings';

const transactionServices = {
  createTransactionCOD: (payload: TCreateTransactionPayload) => {
    return instance.post<SuccessResponse<TTransactionResponse>>(
      `/transaction`,
      payload,
    );
  },

  getTransaction: () => {
    return instance.get<SuccessResponse<TTransactionAllResponse>>(
      `/transaction`,
    );
  },
  getTransactionByOrder: (query: string) => {
    return instance.get<SuccessResponse<TTransactionResponse>>(
      `/transaction/order${query ? `/${query}` : ''}`,
    );
  },
};
export default transactionServices;
