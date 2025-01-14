export type TBrandResponse = TBrand[];
export type TCreateBrandResponse = TBrand;
export type TUpdateBrandResponse = TBrand;

export type TBrand = {
  _id: string;
  name: string;
  created_at: string;
  updated_at: string;
};
export type TBrandPayload = {
  name: string;
};
export type TUpdateBrandPayload = {
  id: string;
  payload: TBrandPayload;
};
