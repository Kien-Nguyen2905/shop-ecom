import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import { TImageResponse } from './tyings';

const imageServices = {
  uploadImage: (payload: FormData) => {
    return instance.post<SuccessResponse<TImageResponse>>(`images`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
export default imageServices;
