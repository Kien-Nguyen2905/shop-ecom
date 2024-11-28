import { useQuery } from '@tanstack/react-query';
import { TOrderResponse } from '../services/Order/tyings';
import orderServices from '../services/Order/orderServices';

export const useOrderByUserQuery = () => {
  return useQuery<TOrderResponse>({
    queryKey: ['order'],
    queryFn: async () => {
      const response = await orderServices.getOrder();
      return Array.isArray(response.data?.data) ? response.data?.data : [];
    },
  });
};
