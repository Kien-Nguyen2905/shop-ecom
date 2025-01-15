export type TUserAllResponse = {
  _id: string;
  email: string;
  password: string;
  role: number;
  forgot_password: string;
  full_name: string;
  phone: string;
  address: Record<string, unknown>;
  earn_point: number;
  total_order: number;
  total_paid: number;
  created_at: string;
  updated_at: string;
};

export type TUserByIdResponse = {
  _id: string;
  email: string;
  role: number;
  full_name: string;
  phone: string;
  address: Record<string, string>;
  earn_point: number;
  total_paid: number;
};

export type TUserDetail = {
  _id: string;
  email: string;
  role: number;
  full_name: string;
  phone: string;
  address: {
    province: string;
    district: string;
    ward: string;
    street_address: string;
  };
  earn_point: number;
  total_paid: number;
};
