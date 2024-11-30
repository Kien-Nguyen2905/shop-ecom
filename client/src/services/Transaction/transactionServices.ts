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
  getTransactionSePay: (queryString = '') => {
    return instance.get<SuccessResponse<TTransactionResponse>>(
      `/transaction/webhook/seepay${queryString ? `${queryString}` : ``}`,
    );
  },
  getAllTransaction: () => {
    return instance.get<SuccessResponse<TTransactionAllResponse>>(
      `/transaction`,
    );
  },
};
export default transactionServices;
