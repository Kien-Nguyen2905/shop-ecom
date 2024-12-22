import { TGetCartResponse } from '../../services/Cart/tyings';
import { TOrderResponse } from '../../services/Order/tyings';
import { TWishlistResponse } from '../../services/Wishlist/tyings';

export type TAddessProps = {
  province?: string;
  district?: string;
  ward?: string;
  street_address?: string;
};
export type TProfile = {
  _id: string;
  email: string;
  role: number;
  full_name: string;
  phone: string;
  address: TAddessProps;
  earn_point: number;
  total_paid: number;
};

export type TAuthState = {
  profile?: TProfile;
  listOrder?: any;
};

export type TCart = TGetCartResponse & {
  subTotal: number;
  total: number;
  totalProduct: number;
  earnPoint?: number;
  appliedPoint?: number;
  discount: number;
};
export type TCartState = {
  cart?: TCart;
  updateStatus: string;
  getStatus: string;
};

export type TWishlistState = {
  wishlist?: TWishlistResponse;
};

export type TOrderState = {
  orderInfo?: TOrderResponse;
  checkoutStatus: string;
};
