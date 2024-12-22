import { ACTION_WISHLIST } from '../../constants/enum';

export type TProductsWishListItem = {
  product_id: string;
  variant_id: string;
  name: string;
  image: string;
  color: string;
  price: number;
  discount: number;
};

export type TProductsWishList = TProductsWishListItem[];

export type TWishlistResponse = {
  _id: string;
  user_id: string;
  products: TProductsWishList;
  created_at: Date;
  updated_at: Date;
};

export type TUpdateWishlistPayload = {
  product_id: string;
  variant_id: string;
  action: ACTION_WISHLIST;
};
