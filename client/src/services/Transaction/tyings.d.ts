export type TTransactionResponse = {
  _id: string;
  user_id: string;
  type_payment: number;
  method_payment: string;
  value: number;
  content: string;
  created_at: string;
  updated_at: string;
};

export type TCreateTransactionPayload = {
  type_payment: number;
  value: number;
  content?: string;
};

export type TTransactionAllResponse = TTransactionResponse[];
