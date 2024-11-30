import { useEffect, useState } from 'react';
import { useMainContext } from '../../context/MainConTextProvider';
import {
  TLoginPayload,
  TProfileResponse,
  TVerifyEmailPayload,
} from '../../services/Auth/typings';
import { useNavigate } from 'react-router-dom';
import {
  ADMIN_PATHS,
  CUSTOMER_PATHS,
  GOOGLE_CLIENT_ID,
  GOOGLE_REDIRECT_URI,
  LOCAL_STORAGE,
} from '../../constants';
import { useVerifyEmailMutation } from '../../queries';
import { handleError, showToast } from '../../libs';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../store/middlewares/authMiddleWare';
import { unwrapResult } from '@reduxjs/toolkit';
import { SuccessResponse } from '../../services/tyings';
import { AppDispatch } from '../../store/store';

export const useModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const verifyEmail = useVerifyEmailMutation();
  const { handleSubmit, control, setError, reset } =
    useForm<TVerifyEmailPayload>({
      mode: 'onChange',
      defaultValues: {
        email: '',
        password: '',
        confirm_password: '',
        full_name: '',
      },
    });
  const navigate = useNavigate();
  const { isOpen, closeModal } = useMainContext();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signIn');

  const handleSignInClick = () => {
    reset();
    setActiveTab('signIn');
  };

  const handleSignUpClick = () => {
    reset();
    setActiveTab('signUp');
  };

  const hanldeLogin = async (values: TLoginPayload) => {
    try {
      setIsLoading(true);
      const res = await dispatch(login(values));
      const dataUser: SuccessResponse<TProfileResponse> =
        unwrapResult<any>(res);
      if (dataUser?.data._id) {
        dataUser?.data?.role === 1
          ? navigate(CUSTOMER_PATHS.ROOT)
          : navigate(ADMIN_PATHS.ROOT);
        closeModal();
        showToast({
          type: 'success',
          message: dataUser.message,
        });
      }
    } catch (error) {
      handleError({
        error,
        setError,
      });
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  const hanldeRegister = async (values: TVerifyEmailPayload) => {
    try {
      const res = await verifyEmail.mutateAsync(values);
      if (res?.data.data?.email_token) {
        closeModal();
        navigate(CUSTOMER_PATHS.VERIFY_EMAIL);
        localStorage.setItem(LOCAL_STORAGE.EMAIL, values.email);
      }
    } catch (error) {
      handleError({
        error,
        setError,
      });
    } finally {
      reset();
    }
  };

  const getGoogleAuthUrl = () => {
    const url = 'https://accounts.google.com/o/oauth2/v2/auth';
    const query = {
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
      prompt: 'consent',
      access_type: 'offline',
    };
    const queryString = new URLSearchParams(query).toString();
    return `${url}?${queryString}`;
  };
  const googleOAuthUrl = getGoogleAuthUrl();

  return {
    activeTab,
    handleSignInClick,
    handleSignUpClick,
    hanldeRegister,
    hanldeLogin,
    closeModal,
    isLoadingVerifyEmail: verifyEmail.isPending,
    isLoadingLogin: isLoading,
    isOpen,
    handleSubmit,
    control,
    googleOAuthUrl,
  };
};
