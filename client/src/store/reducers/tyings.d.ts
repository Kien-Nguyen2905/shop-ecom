import { TAddress } from '../../services/Auth/typings';
import { TGetCartResponse } from '../../services/Cart/tyings';
import { TOrderResponse } from '../../services/Order/tyings';
import { TWishlistResponse } from '../../services/Wishlist/tyings';

export type TProfile = {
  _id: string;
  email: string;
  role: number;
  full_name: string;
  phone: string;
  address: TAddress;
  earn_point: number;
  total_paid: number;
};

export type TAuthState = {
  profile?: TProfile;
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
  cart: TCart | undefined;
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
