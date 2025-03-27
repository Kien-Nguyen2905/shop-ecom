import { useQuery } from '@tanstack/react-query';
import { TUserAllResponse, TUserByIdResponse } from '../services/User/tyings';
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

export const useUserByIdQuery = (id: string = '') => {
  return useQuery<TUserByIdResponse>({
    queryKey: ['users', id],
    queryFn: async () => {
      const response = await userServices.getUserById(id);
      return response.data?.data || {};
    },
    enabled: !!id,
  });
};
