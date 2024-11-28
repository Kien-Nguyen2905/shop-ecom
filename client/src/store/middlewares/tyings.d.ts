import { TCreateOrderPayload } from '../../services/Order/tyings';

export type TActionBankingPayload = {
  order: Omit<TCreateOrderPayload, 'transaction_id'>;
  desc: string;
  value: number;
};

export type TActionCODPayload = Omit<TCreateOrderPayload, 'transaction_id'> & {
  total: number;
};
