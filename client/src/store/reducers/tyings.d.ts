export type TProfile = {
  _id: string;
  email: string;
  role: number;
  full_name: string;
  phone: string;
  address: Record<string, string>;
  earn_point: number;
  total_paid: number;
};

export type TAuthState = {
  profile: Profile | null;
  listOrder: any;
};
