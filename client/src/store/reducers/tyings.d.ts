import { TGetCartResponse } from '../../services/Cart/tyings';

export type TProfile = {
  _id: string;
  email: string;
  role: number;
  full_name: string;
  phone: string;
  address: Record<string, string>;
  earn_point: number;
  total_paid: number;
};

export type TAuthState = {
  profile: Profile | null;
  listOrder: any;
};

export type TCart = TGetCartResponse & {
  subTotal: number;
  total: number;
  totalProduct: number;
};
export type TCartState = {
  cartInfo?: TCart;
  updateStatus: string;
  getStatus: string;
};
