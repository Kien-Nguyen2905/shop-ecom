import { TProductItem } from '../../../services/Product/tyings';

export type TFeaturedProps = {
  productList: TProductItem[];
  selectTab: string;
  setSelectTab: Dispatch<SetStateAction<string>>;
};
