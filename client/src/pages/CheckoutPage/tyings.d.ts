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

export type TValueForm = {
  products: TProductCart[]; // List of products in the cart
  transaction_id: string; // Unique ID for the transaction
  address: {
    province: string; // Name of the province
    district: string; // Name of the district
    ward: string; // Name of the ward
    street_address: string; // Specific street address
  };
  earn_point: number; // Earned points from the transaction
  note: string; // Optional note for the transaction
  type_payment: number; // Payment type, e.g., 0 for a specific method
};
