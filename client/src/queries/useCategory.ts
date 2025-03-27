import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TCategory, TCategoryResponse } from '../services/Category/tyings';
import { categoryServices } from '../services/Category';

export const useCategoryQuery = () => {
  return useQuery<TCategoryResponse>({
    queryKey: ['category'],
    queryFn: async () => {
      const response = await categoryServices.getCategory();
      return Array.isArray(response.data?.data) ? response.data?.data : [];
    },
  });
};

export const useCategoryByIdQuery = (id: string = '') => {
  return useQuery<TCategory>({
    queryKey: ['category', id],
    queryFn: async () => {
      const response = await categoryServices.getCategoryById(id);
      return response.data?.data;
    },
    enabled: !!id,
  });
};

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryServices.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['category'],
        exact: true,
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
        exact: true,
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
        exact: true,
      });
    },
  });
};
