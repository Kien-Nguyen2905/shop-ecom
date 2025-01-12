import { TBrandResponse } from '../../../services/Brand/tyings';
import { TCategoryResponse } from '../../../services/Category/tyings';
import { TProductByIdResponse } from '../../../services/Product/tyings';

export type TViewProductProps = {
  isOpen: boolean;
  closeModalView: () => void;
  listData: TProductByIdResponse;
  categoryList: TCategoryResponse[];
  brandList: TBrandResponse;
};

export type TAddProductProps = {
  isOpen: boolean; // Determines if the Add Product drawer is open
  closeModalAdd: () => void; // Function to close the drawer
  brandList: { _id: string; name: string }[]; // List of brands, each with an id and name
  categoryList: { _id: string; name: string }[]; // List of categories, each with an id and name
};

export type Variant = {
  index: number;
  color: string;
  price: number;
  stock: number;
  discount: number;
  images: string[];
};
export type TFeatured = {
  isPopular: boolean;
  onSale: boolean;
  isRated: boolean;
};

export type FormValues = {
  name: string;
  category_id: string;
  brand_id: string;
  description: string;
  featured: TFeatured;
  thumbnail: any;
  variants: Variant[];
  minimum_stock: number;
  attributes: Record<string, string | []>;
};
