import { TAddessProps } from '../../store/reducers/tyings';
import { TAddress } from '../Auth/typings';

export type TProductOrder = {
  product_id: string;
  image: string;
  name: string;
  variant_id: string;
  color: string;
  price: number;
  discount: number;
  quantity: number;
};
export type TCreateOrderPayload = {
  products: TProductOrder[];
  type_payment?: number;
  note?: string;
  address?: TAddress;
  phone: string;
  earn_point?: number;
  transaction_id: string;
};

export type TCreateOrderResponse = {
  _id?: string;
  user_id: string;
  products: TProductOrder[];
  total: number;
  type_payment: number;
  note?: string;
  address: TAddress;
  phone: string;
  status: number;
  transaction_id: string;
  created_at?: Date;
  updated_at?: Date;
};

type TProductOrderResponse = TProductOrder & { isReviewed: boolean };

export type TOrderResponseItem = {
  _id?: string;
  user_id: string;
  products: TProductOrderResponse[];
  total: number;
  type_payment: number;
  note?: string;
  address: TAddress;
  phone: string;
  status: number;
  transaction_id: string;
  created_at?: Date;
  updated_at?: Date;
};
export type TOrderResponse = TOrderResponseItem[];

export type TOrderAllResponse = TCreateOrderResponse[];

export type TUpdateStatusOrder = {
  user_id: string;
  order_id: string;
  status: number;
};

export type TUpdateStatusOrderDetail = {
  _id?: string;
  user_id: string;
  products: TProductOrder[];
  total: number;
  type_payment: number;
  note?: string;
  address: TAddessProps;
  phone: string;
  status: number;
  transaction_id: string;
  created_at?: Date;
  updated_at?: Date;
};