import { ObjectId } from 'mongodb'
export type TShipment = {
  shipment_date: Date
  quantity: number
}
export type TWarehousePayload = {
  product_id: string
  variant_id: string
  sold: number
  import_quantity: number
  stock: number
  minimum_stock: number
  shipments: TShipment[]
}
export type TWarehouseUpdatePayload = {
  id: string
  quantity: number
}
