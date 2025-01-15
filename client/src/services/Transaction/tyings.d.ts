import { STATUS_TRANSACTION, TYPE_PAYMENT } from '../../constants/enum';

export type TTransactionResponse = {
  _id: string;
  user_id: string;
  type_payment: number;
  method_payment: string;
  status: number;
  value: number;
  content: string;
  created_at: string;
  updated_at: string;
};

export type TCreateTransactionPayload = {
  order_id: string;
  type_payment: TYPE_PAYMENT;
  value: number;
  content?: string;
};
export type TRevenue = {
  month: string;
  revenue: number;
};
export type TTransactionAllResponse = TTransactionResponse[];
