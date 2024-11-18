import { useQuery } from '@tanstack/react-query';
import { TUserAllResponse } from '../services/User/tyings';
import { userServices } from '../services/User';

export const useUserAllQuery = () => {
  return useQuery<TUserAllResponse[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await userServices.getAllUser();
      return Array.isArray(response.data?.data) ? response.data?.data : [];
    },
  });
};
