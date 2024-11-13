import { useState } from 'react';
import { useMainContext } from '../../context/MainConTextProvider';
import {
  TLoginPayload,
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
import { useLoginMutation, useVerifyEmailMutation } from '../../queries';
import { handleError } from '../../libs';
import { useForm } from 'react-hook-form';
export const useModal = () => {
  const verifyEmail = useVerifyEmailMutation();
  const login = useLoginMutation();
  const { handleSubmit, control, setError, reset } =
    useForm<TVerifyEmailPayload>();
  const navigate = useNavigate();
  const { isOpen, closeModal } = useMainContext();

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
    if (values?.email) {
      try {
        const res = await login.mutateAsync(values);
        if (res?.data.data.access_token) {
          localStorage.setItem(
            LOCAL_STORAGE.ACCESS_TOKEN,
            res.data.data.access_token,
          );
          localStorage.setItem(
            LOCAL_STORAGE.REFRESH_TOKEN,
            res.data.data.refresh_token,
          );
          res?.data.data.role
            ? navigate(CUSTOMER_PATHS.ROOT)
            : navigate(ADMIN_PATHS.ROOT);
        }
      } catch (error) {
        handleError({
          error,
          setError,
        });
      }
    }
  };

  const hanldeRegister = async (values: TVerifyEmailPayload) => {
    try {
      const res = await verifyEmail.mutateAsync(values);
      if (res?.data.data.email_token) {
        localStorage.setItem(LOCAL_STORAGE.EMAIL, values.email);
        navigate(CUSTOMER_PATHS.VERIFY_EMAIL);
      }
    } catch (error) {
      handleError({
        error,
        setError,
      });
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
    isLoadingLogin: login.isPending,
    isOpen,
    handleSubmit,
    control,
    googleOAuthUrl,
  };
};
