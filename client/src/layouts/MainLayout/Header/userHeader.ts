import { useState } from 'react';
import { useMainContext } from '../../../context/MainConTextProvider';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const useHeader = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { openModal, closeModal, isOpen } = useMainContext();
  const { profile } = useSelector((state: RootState) => state.auth);
  return { showModal, setShowModal, openModal, closeModal, isOpen, profile };
};

export default useHeader;
