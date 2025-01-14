export type TCategoryResponse = TCategory[];
export type TCategory = {
  _id: string;
  name: string;
  created_at: string;
  updated_at: string;
};
export type TCategoryPayload = {
  name: string;
};
export type TUpdateCategoryPayload = {
  id: string;
  payload: TCategoryPayload;
};
