import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import {
  TRegisterPayload,
  TVerifyEmailResponse,
  TVerifyEmailPayload,
  TRegisterResponse,
  TResendVerifyEmailResponse,
  TResendVerifyEmailPayload,
  TLoginPayload,
  TLoginResponse,
} from './typings';

const authServices = {
  verifyEmail: (payload: TVerifyEmailPayload) => {
    return instance.post<SuccessResponse<TVerifyEmailResponse>>(
      `/users/verify-email`,
      payload,
    );
  },
  register: (payload: TRegisterPayload) => {
    return instance.post<SuccessResponse<TRegisterResponse>>(
      `/users/register`,
      payload,
    );
  },
  resendVerifyEmail: (payload: TResendVerifyEmailPayload) => {
    return instance.post<SuccessResponse<TResendVerifyEmailResponse>>(
      `/users/resend-verify`,
      payload,
    );
  },
  login: (payload: TLoginPayload) => {
    return instance.post<SuccessResponse<TLoginResponse>>(
      `/users/login`,
      payload,
    );
  },
};

export default authServices;
