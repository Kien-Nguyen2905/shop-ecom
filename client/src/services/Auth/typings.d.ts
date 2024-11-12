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
