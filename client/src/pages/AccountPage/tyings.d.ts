export type TValueForm = {
  district: string;
  email: string;
  full_name: string;
  phone: string;
  province: string;
  street_address: string;
  ward: string;
};

export type TUpdateProfilePayload = {
  email: string;
  full_name: string;
  phone: string;
  address: TAddressModify;
};

export type TAddressModify = {
  province?: string;
  district?: string;
  ward?: string;
  street_address?: string;
};
