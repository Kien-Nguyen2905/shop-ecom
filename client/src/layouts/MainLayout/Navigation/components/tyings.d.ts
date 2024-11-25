import { TGetCartResponse } from '../../../../services/Cart/tyings';

export type TDropdownCartItemProps = {
  image: string;
  discount: number;
  name: string;
  variant_id: string;
  color: string;
  price: number;
  quantity: number;
  product_id: string;
  handleRemoveCart: (id: string) => void;
};
export type TDropdownCartProps = TGetCartResponse & {
  subTotal: number;
  total: number;
  totalProduct: number;
  handleRemoveCart: (id: string) => void;
};
