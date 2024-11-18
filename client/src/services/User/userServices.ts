import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import { TUserAllResponse } from './tyings';

const userServices = {
  getAllUser: (queryString: string = '') => {
    return instance.get<SuccessResponse<TUserAllResponse>>(
      `/users/all${queryString ? '?' : ''}${queryString}`,
    );
  },
};
export default userServices;
