import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { TMainContextProviderProps } from './tyings';
import { LOCAL_STORAGE } from '../constants';
import { generateDesc } from '../utils';

const defaultValue: TMainContextProviderProps = {
  isOpen: false,
  setIsOpen: () => null,
  openModal: () => null,
  closeModal: () => null,
  checkAuthen: false,
  setCheckAuthen: () => null,
  desc: '',
  setDesc: () => null,
};

const MainContext = createContext<TMainContextProviderProps>(defaultValue);

export const MainConTextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultValue.isOpen);
  const [checkAuthen, setCheckAuthen] = useState<boolean>(
    defaultValue.checkAuthen,
  );
  const [desc, setDesc] = useState<string>(generateDesc());

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!!localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)) {
      setCheckAuthen(true);
    }
  }, []);

  return (
    <MainContext.Provider
      value={{
        desc,
        setDesc,
        isOpen,
        checkAuthen,
        setCheckAuthen,
        setIsOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
