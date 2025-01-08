import { SetStateAction } from 'react';

export type TMainContextProviderProps = {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModal: () => void;
  isOpenNav: boolean;
  setIsOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
  toggleNavMobile: () => void;
  checkAuthen: boolean;
  setCheckAuthen: React.Dispatch<React.SetStateAction<boolean>>;
};
