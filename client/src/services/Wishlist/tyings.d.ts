export type TListItem = {
  product_id: string;
  variant_id: string;
  image: string;
  name: string;
  price: number;
  discount: number;
};
export type TWishlistResponse = {
  _id: string;
  user_id: string;
  list_item: TListItem[];
  created_at: Date;
  updated_at: Date;
};

export type TAddWishlistPayload = {
  product_id: string;
  variant_id: string;
  quantity: number;
};
