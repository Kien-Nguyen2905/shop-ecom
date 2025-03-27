import { useEffect, useState } from 'react';
import {
  useForgotPasswordMutation,
  useResendForgotPasswordMutation,
  useResetPasswordMutation,
} from '../../queries';
import {
  TForgotPasswordPayload,
  TResetPasswordPayload,
} from '../../services/Auth/typings';
import { handleError, showToast } from '../../libs';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { CUSTOMER_PATHS } from '../../constants';

export const useForgotPasswordPage = () => {
  const navigate = useNavigate();
  const forgotPassword = useForgotPasswordMutation();
  const resendForgotPassword = useResendForgotPasswordMutation();
  const resetPassword = useResetPasswordMutation();
  const [time, setTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstTimeSend, setIsFirstTimeSend] = useState(true);
  const { setError, control, handleSubmit } = useForm<
    TForgotPasswordPayload | Omit<TResetPasswordPayload, 'password_token'>
  >({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
  });
  const { search } = useLocation();
  const token = new URLSearchParams(search).get('token') as string;

  const handlForgotPassword = async (payload: TForgotPasswordPayload) => {
    try {
      setIsLoading(true);
      const res = await forgotPassword.mutateAsync(payload);
      if (res.data.data.forgot_password_token) {
        showToast({
          type: 'success',
          message: res.data.message,
        });
        setIsFirstTimeSend(false);
      }
    } catch (error: any) {
      handleError({
        error,
        setError,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendForgotPassword = async (
    payload: TForgotPasswordPayload,
  ) => {
    try {
      setIsLoading(true);
      const res = await resendForgotPassword.mutateAsync(payload);
      if (res?.data.data.forgot_password_token) {
        showToast({
          type: 'success',
          message: res.data.message,
        });
        setTime(60);
      }
    } catch (error: any) {
      handleError({
        error,
        setError,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (payload: TResetPasswordPayload) => {
    try {
      setIsLoading(true);
      const res = await resetPassword.mutateAsync(payload);
      if (res.data.status === 200) {
        showToast({
          type: 'success',
          message: res.data.message,
        });
        navigate(CUSTOMER_PATHS.ROOT);
      }
    } catch (error) {
      handleError({
        error,
        setError,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSendOrResend = async (
    payload:
      | TForgotPasswordPayload
      | Omit<TResetPasswordPayload, 'password_token'>,
  ) => {
    if (
      token &&
      (payload as Omit<TResetPasswordPayload, 'password_token'>)
        .confirm_password &&
      (payload as Omit<TResetPasswordPayload, 'password_token'>).password
    ) {
      const payloadReset: TResetPasswordPayload = {
        password: (payload as Omit<TResetPasswordPayload, 'password_token'>)
          .password,
        confirm_password: (
          payload as Omit<TResetPasswordPayload, 'password_token'>
        ).confirm_password,
        password_token: token,
      };
      await handleResetPassword(payloadReset as TResetPasswordPayload);
    } else {
      if (isFirstTimeSend) {
        await handlForgotPassword(payload as TForgotPasswordPayload);
      } else {
        await handleResendForgotPassword(payload as TForgotPasswordPayload);
      }
    }
  };

  useEffect(() => {
    let timer: number | undefined;
    if (time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [time]);
  return {
    time,
    control,
    isLoading,
    handleSubmit,
    handleSendOrResend,
    isFirstTimeSend,
    token,
  };
};
