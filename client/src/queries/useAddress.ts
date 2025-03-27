import { useQuery } from '@tanstack/react-query';
import {
  TDistrictsResponse,
  TProvincesResponse,
  TWardsResponse,
} from '../services/Address/tyings';
import { addressServices } from '../services/Address';

export const useProvincesQuery = () => {
  return useQuery<TProvincesResponse[]>({
    queryKey: ['provinces'],
    queryFn: async () => {
      const response = await addressServices.getProvinces();
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
