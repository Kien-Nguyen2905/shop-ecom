import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import {
  TCreateTransactionPayload,
  TRevenue,
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
  getRevenue: (year: string) => {
    return instance.get<SuccessResponse<TRevenue[]>>(
      `/transaction/revenue${year ? `?year=${year}` : ''}`,
    );
  },
};
export default transactionServices;
