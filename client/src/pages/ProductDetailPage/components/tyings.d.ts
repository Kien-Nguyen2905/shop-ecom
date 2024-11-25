import { UseFormReturn } from 'react-hook-form';
import { TProductByIdResponse } from '../../../services/Product/tyings';
import { TCategoryResponse } from '../../../services/Category/tyings';
import { TAddcartPayload } from '../../../components/ProductItem/tyings';
import { TCreateReviewResponse } from '../../../services/Review/tyings';

export type TDisplayProductProps = {
  listImage: any;
};
export type TVariantProps = {
  _id: string;
  color: string;
  price: number;
  stock: number;
  images: string[];
  discount: number;
  isActive?: boolean;
  onChangeVariant?: (_id: string) => void;
};
export type TDisplayProductInforProps = {
  productData: TProductByIdResponse;
  categoryData: TCategoryResponse;
  variantId: string;
  onChangeVariant: (variantId: string) => void;
  quantityForm: UseFormReturn<
    {
      quantity: string;
    },
    any,
    any
  >;
  handleAddCart: (payload: TAddcartPayload) => void;
};
export type TDisplayProductTabsProps = {
  description: string;
  reviewData: TCreateReviewResponse[];
};