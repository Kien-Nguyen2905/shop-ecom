export type TWarehouseResponse = TWarehouseItem[];

export type TWarehouseByIdResponse = TWarehouseItem;
export type TWarehouseUpdateResponse = TWarehouseItem;

export type TWarehouseItem = {
  _id: string;
  product_id: string;
  product_name: string;
  variant: string;
  variant_id: string;
  sold: number;
  import_quantity: number;
  stock: number;
  minimum_stock: number;
  shipments: TShipment[];
  isDeleted: boolean;
  created_at: string;
  updated_at: string;
};

export type TShipment = {
  shipment_date: string;
  quantity: number;
};
export type UpdateWarehousePayLoad = {
  quantity: number;
  variant_id: string;
  product_id: string;
};
export type TUpdateWarehousePayload = {
  id: string;
  payload: UpdateWarehousePayLoad;
};
