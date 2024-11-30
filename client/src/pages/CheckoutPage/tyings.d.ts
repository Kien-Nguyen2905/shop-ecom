import { TProductCart } from '../../services/Cart/tyings';

export type TCheckoutForm = {
  type: string; // "961" is a string, could be a district type or ID
  email: string; // Email address of the person
  full_name: string; // Full name of the person
  note: string; // A note, which seems to be empty in this case
  phone: string; // Phone number
  province: string; // Province ID (e.g., "95")
  district: string;
  street_address: string; // Street address (e.g., "Số nhà 25")
  type_payment: string; // Type of payment method (e.g., "0")
  ward: string; // Ward ID (e.g., "31915")
};

export type TValueFormBanking = {
  products: TProductCart[];
  address: {
    province: string;
    district: string;
    ward: string;
    street_address: string;
  };
  phone: string;
  earn_point: number;
  note: string;
  type_payment: number;
};
