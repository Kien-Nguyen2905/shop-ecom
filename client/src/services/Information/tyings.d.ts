export type TInformationResponse = {
  _id: string;
  category_id: string;
  attributes: Record<string, any>;
};

export type TCreateInformationPayload = {
  category_id: string;
  attributes: {};
};

export type TUpdateInformationPayload = {
  id: string;
  payload: TCreateInformationPayload;
};
