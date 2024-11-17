export type TFeatured = {
  isPopular: boolean;
  onSale: boolean;
  isRated: boolean;
};

export type TProductItem = {
  _id?: string;
  name: string;
  category_id: string;
  brand_id: string;
  thumbnail: string;
  description: string;
  featured: TFeatured;
  variants: TVariant[];
  rate: number;
  created_at?: Date;
  updated_at?: Date;
  firstVariantPrice?: number;
};
export type TPagination = {
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  limit: number;
};
export type TProductResponse = {
  products: TProductItem[];
  pagination: TPagination;
};
export type TProductPayload = {
  name: string;
};
export type TUpdateProductPayload = {
  id: string;
  payload: TProductPayload;
};

export type TProductByIdResponse = {
  _id: string;
  name: string;
  category_id: string;
  brand_id: string;
  thumbnail: string;
  description: string;
  featured: TFeatured;
  variants: TVariant[];
  rate: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
};
export type TFeatured = {
  isPopular: boolean;
  onSale: boolean;
  isRated: boolean;
};
export type TVariant = {
  color: string;
  price: number;
  stock: number;
  images: string[];
  discount: number;
};
export type TCreateProductPayload = {
  name: string;
  category_id: string;
  brand_id: string;
  thumbnail: string;
  description: string;
  featured: TFeatured;
  variants: TVariant[];
  minimum_stock: number;
  attributes: Record<string, string | []>;
};

export type TCreateProductResponse = {
  _id?: ObjectId;
  name: string;
  category_id: ObjectId;
  brand_id: ObjectId;
  thumbnail: string;
  description: string;
  featured: TFeatured;
  variants: TVariant[];
  rate: number;
  attributes: {};
  created_at?: Date;
  updated_at?: Date;
};

export type TUpdateProductPayload = {
  id: string;
  payload: TCreateProductPayload;
};
