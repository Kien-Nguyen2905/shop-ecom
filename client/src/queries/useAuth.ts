import { useMutation } from '@tanstack/react-query';
import { authServices } from '../services/Auth';

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: authServices.verifyEmail,
  });
};

export const useResendVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: authServices.resendVerifyEmail,
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authServices.register,
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authServices.login,
  });
};
