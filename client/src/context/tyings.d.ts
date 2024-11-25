import { SetStateAction } from 'react';

export type TMainContextProviderProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  openModal: () => void;
  closeModal: () => void;
  checkAuthen: boolean;
  setCheckAuthen: React.Dispatch<SetStateAction<boolean>>;
};
