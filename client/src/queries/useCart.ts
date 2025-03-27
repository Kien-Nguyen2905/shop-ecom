import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TGetCartResponse } from '../services/Cart/tyings';
import cartServices from '../services/Cart/cartServices';

export const useCartQuery = () => {
  return useQuery<TGetCartResponse>({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await cartServices.getCart();
      return response.data?.data || {};
    },
  });
};

export const useDeleteCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartServices.removeCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
  });
};

export const useUpdateCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartServices.updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
  });
};
