export type TVerifyEmailResponse = {
  email_token: string;
};
export type TVerifyEmailPayload = {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
};
export type TResendVerifyEmailPayload = {
  email: string;
};
export type TResendVerifyEmailResponse = {
  email_token: string;
};

export type TRegisterPayload = {
  email_token: string;
};
export type TRegisterResponse = {
  access_token: string;
  refresh_token: string;
  role: number;
};

export type TLoginPayload = {
  email: string;
  password: string;
};
export type TLoginResponse = {
  access_token: string;
  refresh_token: string;
  role: number;
};
export type TAddress = {
  province?: string;
  district?: string;
  ward?: string;
  street_address?: string;
};
export type TUserProfileResponse = {
  _id: string;
  email: string;
  role: number;
  full_name: string;
  phone: string;
  address: TAddress;
  earn_point: number;
  total_paid: number;
};

export type TForgotPasswordPayload = TResendVerifyEmailPayload;
export type TForgotPasswordResponse = {
  forgot_password_token: string;
};

export type TResendForgotPasswordPayload = TResendVerifyEmailPayload;
export type TResendForgotPasswordResponse = TForgotPasswordResponse;

export type TResetPasswordPayload = {
  password: string;
  confirm_password: string;
  password_token: string;
};
export type TResetPasswordResponse = {};

export type TLogoutPayload = {
  refresh_token: string;
};

export type TUpdateProfilePayload = {
  full_name: string;
  email: string;
  phone: string;
  address: TAddress;
};
