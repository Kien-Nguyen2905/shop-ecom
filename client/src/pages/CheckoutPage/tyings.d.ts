import { TProductCart } from '../../services/Cart/tyings';

export type TCheckoutForm = {
  email: string;
  full_name: string;
  note: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  street_address: string;
  type_payment: string;
};

export type TValueFormBanking = {
  products: TProductCart[];
  address: {
    province: string;
    district: string;
    ward: string;
    street_address: string;
  };
  phone: string;
  earn_point: number;
  note: string;
  type_payment: number;
};

export type TAddressCustom = {
  value: string;
  label: string;
};
export type TProVincesCustom = TAddressCustom[];
export type TDistrictsCustom = TAddressCustom[];
export type TWardsCustom = TAddressCustom[];
