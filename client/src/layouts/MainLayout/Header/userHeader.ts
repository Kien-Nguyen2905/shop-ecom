import { useState } from 'react';
import { useMainContext } from '../../../context/MainConTextProvider';

const useHeader = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { openModal, closeModal, isOpen } = useMainContext();

  return { showModal, setShowModal, openModal, closeModal, isOpen };
};

export default useHeader;
