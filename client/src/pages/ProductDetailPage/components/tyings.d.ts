import { UseFormReturn } from 'react-hook-form';
import { TProductByIdResponse } from '../../../services/Product/tyings';
import {
  TCategory,
  TCategoryResponse,
} from '../../../services/Category/tyings';
import { TAddcartPayload } from '../../../components/ProductItem/tyings';
import {
  TCreateReviewResponse,
  TReviewByProductIdResponse,
} from '../../../services/Review/tyings';
import { TWarehouseResponse } from '../../../services/Warehouse/tyings';
import { TBrandResponse } from '../../../services/Brand/tyings';
import { TCart } from '../../../store/reducers/tyings';

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
  warehouseData: TWarehouseResponse;
  productData: TProductByIdResponse;
  categoryData: TCategory;
  brandData: TBrandResponse;
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
  onAddWishlist: (payload: TAddWishlistPayload) => void;
  handleToggleShowMore: () => void;
  isModalOpen: boolean;
};
export type TDisplayProductTabsProps = {
  description: string;
  reviewData: TReviewByProductIdResponse[];
};
