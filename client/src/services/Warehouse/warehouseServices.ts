import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import {
  TUpdateWarehousePayload,
  TWarehouseByIdResponse,
  TWarehouseResponse,
} from './tyings';

const warehouseServices = {
  getWarehouse: (queryString?: string) => {
    return instance.get<SuccessResponse<TWarehouseResponse>>(
      `/warehouse${queryString ? `?variantId=${queryString}` : ''}`,
    );
  },
  getWarehouseById: (id: string) => {
    return instance.get<SuccessResponse<TWarehouseByIdResponse>>(
      `/warehouse/${id}`,
    );
  },
  updateWarehouse: (payload: TUpdateWarehousePayload) => {
    return instance.put<SuccessResponse<TWarehouseByIdResponse>>(
      `/warehouse/${payload.id}`,
      payload.payload,
    );
  },
};
export default warehouseServices;
