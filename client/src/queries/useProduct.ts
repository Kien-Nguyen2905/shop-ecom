import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  TProductByIdResponse,
  TProductResponse,
} from '../services/Product/tyings';
import { productServices } from '../services/Product';

export const useProductQuery = (queryString = '') => {
  return useQuery<TProductResponse>({
    queryKey: ['product', queryString],
    queryFn: async () => {
      const response = await productServices.getProduct(queryString);
      return response?.data?.data || [];
    },
  });
};

export const useProductByIdQuery = (id = '') => {
  return useQuery<TProductByIdResponse>({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await productServices.getProductById(id);
      return response?.data?.data || {};
    },
    enabled: !!id, // Chỉ gọi API khi `id` có giá trị
    refetchOnWindowFocus: false, // Không tự động refetch khi focus vào window
    staleTime: 0, // Luôn fetch dữ liệu mới nhất
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productServices.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['product'],
      });
    },
  });
};

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productServices.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['product'],
      });
    },
  });
};

export const useUpadteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productServices.updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['product'],
      });
    },
  });
};
