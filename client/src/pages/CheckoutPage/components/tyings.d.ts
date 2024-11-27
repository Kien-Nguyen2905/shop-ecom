import { Control, FieldValues, SubmitHandler } from 'react-hook-form';
import { TCart } from '../../../store/reducers/tyings';

export type TCheckoutInforProps = {
  control: any;
  handleSubmit: any;
  valueProvince: any;
  dataProvince: any;
  handleChangeProvince: (value: string) => void;
  handleChangeDistrict: (value: string) => void;
  dataDistrict: any;
  valueDistrict: any;
  handleChangeWard: (value: string) => void;
  dataWard: any;
  valueWard: any;
};

export type TCheckoutEarnPointProps = {
  availablePoints: number;
  applyEarnPoint: (points: number) => void;
  appliedPoints: number;
};

export type TPaymentQRProps = {
  isOpen: boolean;
  total: number;
  isConfirmVisible: boolean;
  desc: string;
  handleCancel: () => void;
  handleConfirmClose: () => void;
  setIsConfirmVisible: any;
  handleTransactionSePay: () => void;
};

export type TSummaryCheckoutProps = TCart;
