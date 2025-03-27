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
    enabled: !!id,
  });
};

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

export const useDeleteInformationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: informationServices.deleteInformation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['information'],
      });
    },
  });
};
