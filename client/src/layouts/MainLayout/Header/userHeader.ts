import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { logout } from '../../../store/middlewares/authMiddleWare';
import { handleError } from '../../../libs';
import { LOCAL_STORAGE } from '../../../constants';
import { useMainContext } from '../../../context/MainContextProvider';

const useHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { toggleModal: openModal, toggleModal: closeModal } = useMainContext();
  const [showProfile, setShowProfile] = useState<boolean>(false);

  const { profile } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      const refresh_token = localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);
      if (refresh_token) {
        await dispatch(logout({ refresh_token }));
      }
    } catch (error) {
      handleError({
        error,
      });
    }
  };

  const toggleProfile = () => setShowProfile((prev) => !prev);
  return {
    showProfile,
    toggleProfile,
    openModal,
    closeModal,
    profile,
    dispatch,
    handleLogout,
  };
};

export default useHeader;
