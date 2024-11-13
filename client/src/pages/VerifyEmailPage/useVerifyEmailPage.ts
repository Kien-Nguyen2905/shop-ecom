import { useNavigate } from 'react-router-dom';
import { CUSTOMER_PATHS, LOCAL_STORAGE } from '../../constants';
import { showToast } from '../../libs';
import {
  useRegisterMutation,
  useResendVerifyEmailMutation,
} from '../../queries';
import {
  TRegisterPayload,
  TResendVerifyEmailPayload,
} from '../../services/Auth/typings';
import { useEffect, useState } from 'react';

export const useVerifyEmailPage = () => {
  const [time, setTime] = useState<number>(0);
  const register = useRegisterMutation();
  const resendVerifyEmail = useResendVerifyEmailMutation();
  const navigate = useNavigate();

  const handleRegister = async (payload: TRegisterPayload) => {
    try {
      const res = await register.mutateAsync(payload);
      if (res?.data) {
        localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, res.data.access_token);
        localStorage.setItem(
          LOCAL_STORAGE.REFRESH_TOKEN,
          res.data.refresh_token,
        );
        localStorage.setItem(LOCAL_STORAGE.ROLE, res.data.refresh_token);
        localStorage.removeItem(LOCAL_STORAGE.EMAIL);
        navigate(CUSTOMER_PATHS.ROOT);
      }
    } catch (error: any) {
      if (error.response.data.status) {
        navigate(CUSTOMER_PATHS.ROOT);
      }
      showToast({
        type: 'error',
        message: error.response.data.message,
      });
    }
  };

  const handleResendEmail = async (payload: TResendVerifyEmailPayload) => {
    try {
      const res = await resendVerifyEmail.mutateAsync(payload);
      if (res?.data.email_token) {
        showToast({
          type: 'success',
          message: 'Resend email successfully',
        });
        setTime(60);
      }
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.response.data.message,
      });
    }
  };

  // Sử dụng useEffect để giảm giá trị time mỗi giây
  useEffect(() => {
    let timer: number | undefined;
    if (time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer); // Dừng bộ đếm khi thời gian hết
    }

    return () => clearInterval(timer); // Dọn dẹp interval khi component unmount
  }, [time]);
  return {
    handleRegister,
    isResending: resendVerifyEmail.isPending,
    time,
    handleResendEmail,
  };
};