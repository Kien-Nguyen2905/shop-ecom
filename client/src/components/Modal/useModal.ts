import { useState } from 'react';
import { useMainContext } from '../../context/MainContextProvider';
import {
  TLoginPayload,
  TUserProfileResponse,
  TVerifyEmailPayload,
} from '../../services/Auth/typings';
import { useNavigate } from 'react-router-dom';
import {
  ADMIN_PATHS,
  CUSTOMER_PATHS,
  LOCAL_STORAGE,
  MODAL_TABS,
} from '../../constants';
import { useVerifyEmailMutation } from '../../queries';
import { handleError, showToast } from '../../libs';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../store/middlewares/authMiddleWare';
import { unwrapResult } from '@reduxjs/toolkit';
import { SuccessResponse } from '../../services/tyings';
import { AppDispatch } from '../../store/store';
import { ROLE } from '../../constants/enum';
import { googleOAuthUrl } from '../../utils/googleAuthUrl';

export const useModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const verifyEmail = useVerifyEmailMutation();
  const { handleSubmit, control, setError, reset } =
    useForm<TVerifyEmailPayload>({
      defaultValues: {
        email: '',
        password: '',
        confirm_password: '',
        full_name: '',
      },
    });
  const navigate = useNavigate();
  const { isOpenModal, toggleModal: closeModal } = useMainContext();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(MODAL_TABS.SIGN_IN);

  const handleSignInClick = () => {
    reset();
    setActiveTab(MODAL_TABS.SIGN_IN);
  };

  const handleSignUpClick = () => {
    reset();
    setActiveTab(MODAL_TABS.SIGN_UP);
  };

  const handleLogin = async (values: TLoginPayload) => {
    try {
      setIsLoading(true);
      const res = await dispatch(login(values));
      const dataUser: SuccessResponse<TUserProfileResponse> =
        unwrapResult<any>(res);
      if (dataUser?.data._id) {
        dataUser?.data?.role === ROLE.CUSTOMER
          ? navigate(CUSTOMER_PATHS.ROOT)
          : navigate(ADMIN_PATHS.ROOT);
        closeModal();
        reset();
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
    }
  };

  const handleRegister = async (values: TVerifyEmailPayload) => {
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
    }
  };

  const onSubmit = (values: TVerifyEmailPayload) => {
    if (activeTab === MODAL_TABS.SIGN_IN) {
      handleLogin?.(values);
    } else {
      handleRegister?.(values);
    }
  };

  return {
    activeTab,
    handleSignInClick,
    handleSignUpClick,
    handleRegister,
    handleLogin,
    closeModal,
    isLoadingRegister: verifyEmail.isPending,
    isLoadingLogin: isLoading,
    isOpenModal,
    onSubmit: handleSubmit(onSubmit),
    control,
    googleOAuthUrl,
  };
};
