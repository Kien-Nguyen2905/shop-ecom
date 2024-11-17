import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TCategoryResponse } from '../services/Category/tyings';
import { categoryServices } from '../services/Category';

export const useCategoryQuery = () => {
  return useQuery<TCategoryResponse[]>({
    queryKey: ['category'],
    queryFn: async () => {
      const response = await categoryServices.getCategory();
      return Array.isArray(response.data?.data) ? response.data?.data : [];
    },
    refetchOnWindowFocus: false, // Không tự động refetch khi focus vào window
  });
};

export const useCategoryByIdQuery = (id: string) => {
  return useQuery<TCategoryResponse>({
    queryKey: ['category', id],
    queryFn: async () => {
      const response = await categoryServices.getCategoryById(id);
      return response.data?.data;
    },
    enabled: !!id, // Chỉ gọi API khi `id` có giá trị
    refetchOnWindowFocus: false, // Không tự động refetch khi focus vào window
    staleTime: 0, // Luôn fetch dữ liệu mới nhất
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
