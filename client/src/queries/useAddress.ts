import { useQuery } from '@tanstack/react-query';
import {
  TDistrictsResponse,
  TProvicesResponse,
  TWardsResponse,
} from '../services/Address/tyings';
import { addressServices } from '../services/Address';

export const useProvicesQuery = () => {
  return useQuery<TProvicesResponse[]>({
    queryKey: ['provices'],
    queryFn: async () => {
      const response = await addressServices.getProvices();
      return Array.isArray(response.data?.data) ? response.data?.data : [];
    },
  });
};

export const useDistrictsQuery = (id: string = '') => {
  return useQuery<TDistrictsResponse[]>({
    queryKey: ['districts', id],
    queryFn: async () => {
      const response = await addressServices.getDistricts(id);
      return Array.isArray(response.data?.data) ? response.data?.data : [];
    },
  });
};

export const useWardsQuery = (id: string = '') => {
  return useQuery<TWardsResponse[]>({
    queryKey: ['wards', id],
    queryFn: async () => {
      const response = await addressServices.getWards(id);
      return Array.isArray(response.data?.data) ? response.data?.data : [];
    },
  });
};
