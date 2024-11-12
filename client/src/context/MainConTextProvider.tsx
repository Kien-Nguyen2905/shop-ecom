import { ReactNode, createContext, useContext, useState } from 'react';
import { TMainContextProviderProps } from './tyings';

const defaultValue: TMainContextProviderProps = {
  isOpen: false,
  setIsOpen: () => null,
  openModal: () => null,
  closeModal: () => null,
};
const MainContext = createContext<TMainContextProviderProps>(defaultValue);

export const MainConTextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultValue.isOpen);
  const openModal = () => {
    setIsOpen(!isOpen);
  };
  const closeModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <MainContext.Provider value={{ isOpen, setIsOpen, openModal, closeModal }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
