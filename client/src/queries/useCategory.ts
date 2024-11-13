import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import categoryServices from '../services/Category/categoryServices';
import { TCategoryResponse } from '../services/Category/tyings';

export const useCategoryQuery = () => {
  return useQuery<TCategoryResponse[]>({
    queryKey: ['category'],
    queryFn: async () => {
      const response = await categoryServices.getCategory();
      return Array.isArray(response.data?.data) ? response.data?.data : [];
    },
  });
};

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryServices.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['category'],
      });
    },
  });
};

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryServices.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['category'],
      });
    },
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryServices.updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['category'],
      });
    },
  });
};
