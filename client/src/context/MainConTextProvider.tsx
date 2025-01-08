import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { LOCAL_STORAGE } from '../constants';
import { TMainContextProviderProps } from './tyings';

const defaultValue: TMainContextProviderProps = {
  isOpenModal: false,
  setIsOpenModal: () => null,
  toggleModal: () => null,
  isOpenNav: false,
  setIsOpenNav: () => null,
  toggleNavMobile: () => null,
  checkAuthen: false,
  setCheckAuthen: () => null,
};

const MainContext = createContext<TMainContextProviderProps>(defaultValue);

export const MainContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(
    defaultValue.isOpenModal,
  );
  const [isOpenNav, setIsOpenNav] = useState<boolean>(defaultValue.isOpenNav);
  const [checkAuthen, setCheckAuthen] = useState<boolean>(
    defaultValue.checkAuthen,
  );

  const toggleModal = () => setIsOpenModal((prev) => !prev);
  const toggleNavMobile = () => setIsOpenNav((prev) => !prev);
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
    setCheckAuthen(!!token);
  }, []);

  const contextValue = useMemo(
    () => ({
      isOpenModal,
      setIsOpenModal,
      toggleModal,
      isOpenNav,
      setIsOpenNav,
      toggleNavMobile,
      checkAuthen,
      setCheckAuthen,
    }),
    [isOpenModal, isOpenNav, checkAuthen],
  );
  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useMainContext must be used within a MainContextProvider');
  }
  return context;
};
