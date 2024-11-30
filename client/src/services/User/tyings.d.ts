// Define the TCusomterResponse type
export type TUserAllResponse = {
  _id: string;
  email: string;
  password: string;
  role: number;
  forgot_password: string;
  full_name: string;
  phone: string;
  address: Record<string, unknown>; // Generic object for address
  earn_point: number;
  total_order: number;
  total_paid: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
};

export type TUserByIdResponse = {
  _id: string;
  email: string;
  role: number;
  full_name: string;
  phone: string;
  address: Record<string, string>; // Vì address là object, ta có thể dùng kiểu linh hoạt
  earn_point: number;
  total_paid: number;
};

export type TUserDetail = {
  _id: string; // MongoDB ObjectId or a string ID
  email: string;
  role: number; // Assuming role is a numeric value
  full_name: string;
  phone: string;
  address: {
    province: string;
    district: string;
    ward: string;
    street_address: string;
  };
  earn_point: number; // Points earned by the user
  total_paid: number; // Total amount paid by the user
};
