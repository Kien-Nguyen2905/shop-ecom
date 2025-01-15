import { Dispatch, SetStateAction } from 'react';
import { TBrandResponse } from '../../../services/Brand/tyings';
import { TCategoryResponse } from '../../../services/Category/tyings';
import { TProductByIdResponse } from '../../../services/Product/tyings';
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { UploadFile } from 'antd';
import { TInformationResponse } from '../../../services/Information/tyings';

export type TProductProps = {
  isOpen: boolean;
  closeModalAdd: () => void;
  brandList: TBrandResponse;
  categoryList: TCategoryResponse;
  isView?: boolean;
  setCategoryId: Dispatch<SetStateAction<string>>;
  variants: any[];
  setVariants: Dispatch<SetStateAction<any[]>>;
  watch: UseFormWatch<FormValues>;
  handleSaveProduct: () => void;
  control: Control<FormValues, any>;
  errors: FieldErrors<FormValues>;
  onChange: (fileList: newFileList) => void;
  onPreview: (file: UploadFile) => void;
  setValue: UseFormSetValue<FormValues>;
  fileList: UploadFile[];
  activeKey: string[];
  handleCollapseChange: (key: string | string[]) => void;
  onChangeVariant: any;
  uploadedImages: {
    [key: number]: any[];
  };
  handleRemoveVariant: (index: number) => void;
  handleAddVariant: () => void;
  dataInformation: TInformationResponse;
  showAttributeByCategory: (categoryId: string) => void;
  productDetails: TProductByIdResponse;
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
  variants: TVariant[];
  minimum_stock: number;
  attributes: Record<string, string | []>;
};
