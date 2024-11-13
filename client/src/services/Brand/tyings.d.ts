export type TBrandResponse = {
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
