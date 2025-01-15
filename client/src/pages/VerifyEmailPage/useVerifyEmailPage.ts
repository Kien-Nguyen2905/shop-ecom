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
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getCart } from '../../store/middlewares/cartMiddleware';
import { profileUser } from '../../store/middlewares/authMiddleWare';

export const useVerifyEmailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [time, setTime] = useState<number>(0);
  const register = useRegisterMutation();
  const resendVerifyEmail = useResendVerifyEmailMutation();
  const navigate = useNavigate();

  const handleRegisterByEmail = async (payload: TRegisterPayload) => {
    try {
      const res = await register.mutateAsync(payload);
      if (res?.data.data) {
        localStorage.setItem(
          LOCAL_STORAGE.ACCESS_TOKEN,
          res.data.data.access_token,
        );
        localStorage.setItem(
          LOCAL_STORAGE.REFRESH_TOKEN,
          res.data.data.refresh_token,
        );
        localStorage.setItem(LOCAL_STORAGE.ROLE, res.data.data.role.toString());
        localStorage.removeItem(LOCAL_STORAGE.EMAIL);
        navigate(CUSTOMER_PATHS.ROOT);
        await dispatch(profileUser());
        await dispatch(getCart());
        showToast({
          type: 'success',
          message: res.data.message,
        });
      }
    } catch (error: any) {
      if (error.response.data.status) {
        navigate(CUSTOMER_PATHS.ROOT);
      }
      showToast({
        type: 'warn',
        message: error.response.data.message,
      });
    }
  };

  const handleResendEmail = async (payload: TResendVerifyEmailPayload) => {
    try {
      const res = await resendVerifyEmail.mutateAsync(payload);
      if (res?.data.data.email_token) {
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
    handleRegisterByEmail,
    isResending: resendVerifyEmail.isPending,
    time,
    handleResendEmail,
  };
};
