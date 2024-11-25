import { TCart } from './../../../store/reducers/tyings.d';
import { TAddcartPayload } from '../../../components/ProductItem/tyings';
import { TDropdownCartProps } from '../../../layouts/MainLayout/Navigation/components/tyings';
import { TCart } from '../../../store/reducers/tyings';

export type TCartViewProps = TCart & {
  handleAddCart: (payload: TAddcartPayload) => void;
  handleRemoveCart: (payload: string) => void;
};

export type TCartInvoice = TCart;
