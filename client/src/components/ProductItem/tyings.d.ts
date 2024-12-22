import { TUpdateCartPayload } from '../../services/Cart/tyings';
import { TProductItem } from '../../services/Product/tyings';

export type TProductItemProps = {
  className?: string;
  product: TProductItem;
};
export type TAddcartPayload = TUpdateCartPayload;
