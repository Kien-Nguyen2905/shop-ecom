import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  TWarehouseByIdResponse,
  TWarehouseResponse,
} from '../services/Warehouse/tyings';
import { warehouseServices } from '../services/Warehouse';

// Hook để lấy danh sách warehouse
export const useWarehouse = () => {
  return useQuery<TWarehouseResponse>({
    queryKey: ['warehouse'],
    queryFn: async () => {
      const response = await warehouseServices.getWarehouse();
      return response.data?.data || [];
    },
    refetchOnWindowFocus: false, // Không tự động refetch khi focus vào window
  });
};

// Hook để lấy chi tiết warehouse theo ID
export const useWarehouseByIdQuery = (id: string) => {
  return useQuery<TWarehouseByIdResponse>({
    queryKey: ['warehouse', id],
    queryFn: async () => {
      const response = await warehouseServices.getWarehouseById(id);
      return response.data?.data;
    },
    enabled: !!id, // Chỉ gọi API khi `id` có giá trị
    refetchOnWindowFocus: false, // Không tự động refetch khi focus vào window
    staleTime: 0, // Luôn fetch dữ liệu mới nhất
  });
};

// Hook để cập nhật warehouse
export const useUpdateWarehouseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: warehouseServices.updateWarehouse,
    onSuccess: () => {
      // Invalidate queries liên quan để làm mới dữ liệu
      queryClient.invalidateQueries({
        queryKey: ['warehouse'],
      });
    },
  });
};
