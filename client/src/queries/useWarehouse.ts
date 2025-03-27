import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  TWarehouseByIdResponse,
  TWarehouseResponse,
} from '../services/Warehouse/tyings';
import { warehouseServices } from '../services/Warehouse';

export const useWarehouse = (query?: string) => {
  return useQuery<TWarehouseResponse>({
    queryKey: ['warehouse'],
    queryFn: async () => {
      const response = await warehouseServices.getWarehouse(query);
      return response.data?.data || [];
    },
  });
};

export const useWarehouseByIdQuery = (id: string) => {
  return useQuery<TWarehouseByIdResponse>({
    queryKey: ['warehouse', id],
    queryFn: async () => {
      const response = await warehouseServices.getWarehouseById(id);
      return response.data?.data;
    },
    enabled: !!id,
  });
};

export const useUpdateWarehouseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: warehouseServices.updateWarehouse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['warehouse'],
      });
    },
  });
};
