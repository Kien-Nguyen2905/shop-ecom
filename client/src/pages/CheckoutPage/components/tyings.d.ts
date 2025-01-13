import { Control, FieldValues, SubmitHandler } from 'react-hook-form';
import { TCart } from '../../../store/reducers/tyings';
import { TDistrictsCustom, TProVincesCustom, TWardsCustom } from '../tyings';

export type TCheckoutInforProps = {
  control: any;
  valueProvince: string;
  dataProvince: TProVincesCustom;
  handleChangeProvince: (value: string) => void;
  handleChangeDistrict: (value: string) => void;
  dataDistrict: TDistrictsCustom;
  valueDistrict: string;
  handleChangeWard: (value: string) => void;
  dataWard: TWardsCustom;
  valueWard: string;
};

export type TCheckoutEarnPointProps = {
  availablePoints: number;
  applyEarnPoint: (points: number) => void;
  appliedPoints: number;
};

export type TSummaryCheckoutProps = TCart;
