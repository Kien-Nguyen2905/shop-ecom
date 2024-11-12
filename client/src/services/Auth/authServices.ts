import { instance } from '../Interceptor';
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
    return instance.post<TVerifyEmailResponse>(`/users/verify-email`, payload);
  },
  register: (payload: TRegisterPayload) => {
    return instance.post<TRegisterResponse>(`/users/register`, payload);
  },
  resendVerifyEmail: (payload: TResendVerifyEmailPayload) => {
    return instance.post<TResendVerifyEmailResponse>(
      `/users/resend-verify`,
      payload,
    );
  },
  login: (payload: TLoginPayload) => {
    return instance.post<TLoginResponse>(`/users/login`, payload);
  },
};

export default authServices;
