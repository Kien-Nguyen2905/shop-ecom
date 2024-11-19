export type TUserReview = {
  user_id: string;
  full_name: string;
  email: string;
};
export type TProductReview = {
  product_id: string;
  variant_id: string;
  name: string;
  image: string;
  color: string;
};
export type TReviewResponse = TCreateReviewResponse[];
export type TCreateReviewResponse = {
  _id: string;
  reviewer: TUserReview;
  order_id: ObjectId;
  product: TProductReview;
  title: string;
  description: string;
  rate: number;
  created_at?: string;
  updated_at?: string;
};

export type TCreateReviewPayload = {
  user_id: string;
  order_id: string;
  product_id: string;
  variant_id: string;
  title: string;
  description: string;
  rate: number;
};
