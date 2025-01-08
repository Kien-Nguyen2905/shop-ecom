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
  TUserProfileResponse,
  TForgotPasswordResponse,
  TResendForgotPasswordPayload,
  TResendForgotPasswordResponse,
  TResetPasswordPayload,
  TResetPasswordResponse,
  TForgotPasswordPayload,
  TLogoutPayload,
  TUpdateProfilePayload,
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
  getProfile: () => {
    return instance.get<SuccessResponse<TUserProfileResponse>>(
      `/users/profile`,
    );
  },
  forgotPassword: (payload: TForgotPasswordPayload) => {
    return instance.post<SuccessResponse<TForgotPasswordResponse>>(
      `/users/forgot-password`,
      payload,
    );
  },
  resendforgotPassword: (payload: TResendForgotPasswordPayload) => {
    return instance.post<SuccessResponse<TResendForgotPasswordResponse>>(
      `/users/resend-forgot`,
      payload,
    );
  },
  resetPassword: (payload: TResetPasswordPayload) => {
    return instance.post<SuccessResponse<TResetPasswordResponse>>(
      `/users/reset-password`,
      payload,
    );
  },
  logout: (payload: TLogoutPayload) => {
    return instance.post<SuccessResponse<{}>>(`/users/logout`, payload);
  },
  updateProfile: (payload: TUpdateProfilePayload) => {
    return instance.put<SuccessResponse<TUserProfileResponse>>(
      `/users/profile`,
      payload,
    );
  },
};

export default authServices;
