import { TCategoryResponse } from '../../../services/Category/tyings';
import {
  TProductItem,
  TProductResponse,
} from '../../../services/Product/tyings';

export type TProductListProps = {
  listProduct: TProductResponse;
  onPageChange: (page: number) => void;
};

export type TFilterProductProps = {
  setSortValue: Dispatch<SetStateAction<string>>;
  categories: TCategoryResponse[];
  onCategoryChange: (field: string, value: string) => void;
  onRangePriceChange: (value: number[]) => void;
  selectedFilters: Record<string, boolean>;
  handleCheckboxChange: (value: string) => void;
  setSelectedFilters: Dispatch<SetStateAction<Record<string, boolean>>>;
};
