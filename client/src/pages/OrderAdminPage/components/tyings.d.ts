import { TUpdateStatusOrder } from '../../../services/Order/tyings';
import { TUserAllResponse } from '../../../services/User/tyings';
import { TOrderItem } from '../tyings';

export type TOrderDetailProps = {
  isOpenModal: boolean;
  userDetail: TUserAllResponse;
  orderDetail: TOrderItem;
  closeModal: () => void;
  tableProductData: TProductRecord[];
  handleOrder: (payload: TUpdateStatusOrder) => void;
};

export type TProductRecord = {
  key: string;
  name: string;
  variant: string;
  image: string;
  price: number;
  quantity: number;
  total: number;
};
