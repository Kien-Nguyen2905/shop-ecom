import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TInformationResponse } from '../services/Information/tyings';
import informationServices from '../services/Information/informationService';

export const useInformationByIdQuery = (id: string) => {
  return useQuery<TInformationResponse>({
    queryKey: ['information', id],
    queryFn: async () => {
      const response = await informationServices.getInformation(id);
      return response.data?.data;
    },
    enabled: !!id, // Chỉ gọi API khi `id` có giá trị
    refetchOnWindowFocus: false, // Không tự động refetch khi focus vào window
    staleTime: 0, // Luôn fetch dữ liệu mới nhất
    retry: false,
  });
};

// Create new information
export const useCreateInformationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: informationServices.createInformation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['information'],
      });
    },
  });
};

// Update information
export const useUpdateInformationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: informationServices.updateInformation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['information'],
      });
    },
  });
};

// Delete information
export const useDeleteInformationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: informationServices.deletInformation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['information'],
      });
    },
  });
};
