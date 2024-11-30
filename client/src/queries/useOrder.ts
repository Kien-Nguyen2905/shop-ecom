import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TOrderAllResponse } from '../services/Order/tyings';
import orderServices from '../services/Order/orderServices';

export const useOrderAllQuery = () => {
  return useQuery<TOrderAllResponse>({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await orderServices.getAllOrder();
      return Array.isArray(response.data?.data) ? response.data?.data : [];
    },
    refetchOnWindowFocus: false, // Không tự động refetch khi focus vào window
  });
};

export const useUpdateStatusOrderMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderServices.updateStatus,
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
      // Mặc định: invalidate cache
      queryClient.invalidateQueries({
        queryKey: ['orders'],
        exact: true,
      });
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });
};
