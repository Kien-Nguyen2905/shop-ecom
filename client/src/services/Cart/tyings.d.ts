export type TProductCart = {
  product_id: string;
  image: string;
  name: string;
  variant_id: string;
  color: string;
  price: number;
  discount: number;
  quantity: number;
};
export type TGetCartResponse = {
  _id: string;
  user_id: string;
  products: TProductCart[];
  created_at: Date;
  updated_at: Date;
};
export type TUpdateCartPayload = {
  product_id: string;
  variant_id: string;
  quantity: number;
};
export type TUpdateCartResponse = TGetCartResponse;

export type TRemoveCartPayload = {
  item_id: string;
};
export type TDeleteCartResponse = TGetCartResponse;
