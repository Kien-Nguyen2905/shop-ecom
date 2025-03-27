export type TProvincesResponse = {
  _id: sting;
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
};

export type TDistrictsResponse = Omit<TProvincesResponse, 'phone_code'> & {
  province_code: number;
};

export type TWardsResponse = Omit<TProvincesResponse, 'phone_code'> & {
  district_code: number;
};
