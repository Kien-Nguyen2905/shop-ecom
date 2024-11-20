import { useState } from 'react';
import { useMainContext } from '../../../context/MainConTextProvider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const useHeader = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { openModal, closeModal, isOpen } = useMainContext();
  const { profile } = useSelector((state: RootState) => state.auth);
  return {
    showModal,
    setShowModal,
    openModal,
    closeModal,
    isOpen,
    profile,
    dispatch,
  };
};

export default useHeader;
