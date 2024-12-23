export type TCreateReviewResponse = {
  _id: string;
  user_id: string;
  order_id: string;
  product_id: string;
  variant_id: string;
  title: string;
  description: string;
  rate: number;
  created_at?: string;
  updated_at?: string;
};
export type TReviewResponse = TCreateReviewResponse[];
type TUserReview = {
  email: string;
  full_name: string;
  phone: string;
};
type TProductReview = {
  name: string;
  thumbnail: string;
};
type TVariantReview = {
  index: number;
  color: string;
  price: number;
  stock: number;
  discount: number;
  images: string[];
  _id: string;
  sold: number;
};
export type TReviewByProductIdResponse = {
  _id: string;
  user_id: string;
  order_id: string;
  product_id: string;
  variant_id: string;
  title: string;
  description: string;
  rate: number;
  user: TUserReview;
  product: TProductReview;
  variant: TVariantReview;
  created_at: string;
  updated_at: string;
};
export type TCreateReviewPayload = {
  user_id?: string;
  order_id: string;
  product_id: string;
  variant_id: string;
  title: string;
  description: string;
  rate: number;
};
