import { TProductItem } from '../../../services/Product/tyings';

export type TFeaturedProps = {
  productList: TProductItem[];
  selectTab: String;
  setSelectTab: Dispatch<SetStateAction<String>>;
};
