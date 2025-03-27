import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import {
  TCreateInformationPayload,
  TInformationResponse,
  TUpdateInformationPayload,
} from './tyings';

const informationServices = {
  createInformation: (payload: TCreateInformationPayload) => {
    return instance.post<SuccessResponse<TInformationResponse>>(
      `/information`,
      payload,
    );
  },
  updateInformation: (payload: TUpdateInformationPayload) => {
    return instance.put<SuccessResponse<TInformationResponse>>(
      `/information/${payload.id}`,
      payload.payload,
    );
  },
  getInformation: (id: string) => {
    return instance.get<SuccessResponse<TInformationResponse>>(
      `/information/${id}`,
    );
  },
  deleteInformation: (id: string) => {
    return instance.delete<SuccessResponse>(`/information/${id}`);
  },
};
export default informationServices;
