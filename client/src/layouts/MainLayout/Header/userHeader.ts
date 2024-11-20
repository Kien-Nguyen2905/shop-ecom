import { useState } from 'react';
import { useMainContext } from '../../../context/MainConTextProvider';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { logout } from '../../../store/middlewares/authMiddleWare';
import { handleError, showToast } from '../../../libs';
import { LOCAL_STORAGE } from '../../../constants';

const useHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { openModal, closeModal, isOpen } = useMainContext();
  const { profile } = useSelector((state: RootState) => state.auth);
  const handleLogout = async () => {
    try {
      const refresh_token = localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);
      if (refresh_token) {
        await dispatch(logout({ refresh_token }));
      } else {
        showToast({
          type: 'error',
          message: 'Error',
        });
      }
    } catch (error) {
      handleError({
        error,
      });
    }
  };
  return {
    showModal,
    setShowModal,
    openModal,
    closeModal,
    isOpen,
    profile,
    dispatch,
    handleLogout,
  };
};

export default useHeader;
