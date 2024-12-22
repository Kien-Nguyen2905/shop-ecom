import { TProductItem } from '../../../../services/Product/tyings';

export type TFeaturedItemProps = {
  productList: TProductItem[];
  className?: string;
};

export type TArrowSlideProps = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
};
