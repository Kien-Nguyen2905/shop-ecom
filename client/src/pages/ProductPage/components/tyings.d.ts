import { TCategoryResponse } from '../../../services/Category/tyings';
import { TProductItem } from '../../../services/Product/tyings';

export type TProductListProps = {
  listProduct: TProductItem[];
  isLoadingProduct: boolean;
};

export type TFilterProductProps = {
  categories: TCategoryResponse;
  onCategoryChange: (field: string, value: string) => void;
  handlePriceChange: (value: number[]) => void;
  selectedFilters: Record<string, boolean>;
  handleCheckboxChange: (value: string) => void;
  setIsChecked: Dispatch<SetStateAction<string>>;
  isChecked: string;
  priceRange?: number[];
  isXlScreen: boolean;
  onSale: string;
  popular: string;
  topRated: string;
  handleCleanAll: () => void;
};
