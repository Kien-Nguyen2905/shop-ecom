import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import { TUserAllResponse, TUserByIdResponse } from './tyings';

const userServices = {
  getAllUser: (queryString: string = '') => {
    return instance.get<SuccessResponse<TUserAllResponse[]>>(
      `/users/all${queryString ? '?' : ''}${queryString}`,
    );
  },
  getUserById: (queryString: string) => {
    return instance.get<SuccessResponse<TUserByIdResponse>>(
      `/users${queryString ? `/${queryString}` : ''}`,
    );
  },
};
export default userServices;
