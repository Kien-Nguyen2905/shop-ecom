import { useQuery } from '@tanstack/react-query';
import { TTransactionAllResponse } from '../services/Transaction/tyings';
import { transactionServices } from '../services/Transaction';

export const useTransactionAllQuery = () => {
  return useQuery<TTransactionAllResponse>({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await transactionServices.getTransaction();
      return response.data.data || [];
    },
  });
};
