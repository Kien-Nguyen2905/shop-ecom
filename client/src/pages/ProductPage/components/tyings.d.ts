import { TCategoryResponse } from '../../../services/Category/tyings';
import { TProductItem } from '../../../services/Product/tyings';

export type TProductListProps = {
  listProduct: TProductItem[];
};

export type TFilterProductProps = {
  categories: TCategoryResponse[];
  onCategoryChange: (field: string, value: string) => void;
  onRangePriceChange: (value: number[]) => void;
  selectedFilters: Record<string, boolean>;
  handleCheckboxChange: (value: string) => void;
  setSelectedFilters: Dispatch<SetStateAction<Record<string, boolean>>>;
};
