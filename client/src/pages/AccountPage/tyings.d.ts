export type TValueForm = {
  district: string; // Represents the district ID as a string
  email: string; // The email address
  full_name: string; // The full name of the individual
  phone: string; // The phone number
  province: string; // Represents the province ID as a string
  street_address: string; // The street address
  ward: string; // Represents the ward ID as a string
};

export type TUpdateProfilePayload = {
  email: string; // The email address
  full_name: string; // The full name of the individual
  phone: string; // The phone number
  address: TAddressModify;
};

export type TAddressModify = {
  province?: string;
  district?: string;
  ward?: string;
  street_address?: string;
};
