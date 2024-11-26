import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import {
  TDistrictsResponse,
  TProvicesResponse,
  TWardsResponse,
} from './tyings';

const addressServices = {
  getProvices: () => {
    return instance.get<SuccessResponse<TProvicesResponse[]>>(
      `/address/provinces`,
    );
  },
  getDistricts: (province_code = '') => {
    return instance.get<SuccessResponse<TDistrictsResponse[]>>(
      `/address/districts${province_code ? `/${province_code}` : ''}`,
    );
  },
  getWards: (district_code = '') => {
    return instance.get<SuccessResponse<TWardsResponse[]>>(
      `/address/wards${district_code ? `/${district_code}` : ''}`,
    );
  },
};
export default addressServices;
