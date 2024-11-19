// Define the TCusomterResponse type
export type TUserAllResponse = {
  data: Array<{
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
  }>;
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
