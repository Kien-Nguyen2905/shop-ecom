import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  TProductByIdResponse,
  TProductResponse,
  TUpdateProductPayload,
} from '../services/Product/tyings';
import { productServices } from '../services/Product';

export const useProductQuery = (queryString = '') => {
  return useQuery<TProductResponse>({
    queryKey: ['product', queryString],
    queryFn: async () => {
      const response = await productServices.getProduct(queryString);
      return response?.data?.data || [];
    },
    staleTime: 60 * 1000,
  });
};

export const useProductByIdQuery = (id: string) => {
  return useQuery<TProductByIdResponse>({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await productServices.getProductById(id);
      return response?.data?.data || {};
    },
    enabled: !!id,
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

export const useUpdateProductMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TUpdateProductPayload) =>
      productServices.updateCategory(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['product'],
      });
    },
  });
};
