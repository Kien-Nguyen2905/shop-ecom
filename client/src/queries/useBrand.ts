import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { brandServices } from '../services/Brand';
import { TBrandResponse } from '../services/Brand/tyings';

export const useBrandQuery = () => {
  return useQuery<TBrandResponse>({
    queryKey: ['brand'],
    queryFn: async () => {
      const response = await brandServices.getBrand();
      return Array.isArray(response.data?.data) ? response.data?.data : [];
    },
  });
};

export const useCreateBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: brandServices.createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['brand'],
      });
    },
  });
};

export const useDeleteBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: brandServices.deleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['brand'],
      });
    },
  });
};

export const useUpdateBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: brandServices.updateBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['brand'],
      });
    },
  });
};
