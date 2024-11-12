import { ObjectId } from 'mongodb'
import { STATUS_ORDER, TYPE_PAYMENT } from '~/constants/enum'
import { TOrderProps, TProductOrder } from '~/models/schemas/orders/type'
import { TAddessProps } from '~/models/schemas/users/type'

export default class Order {
  _id?: ObjectId
  user_id: ObjectId
  products: TProductOrder[]
  total: number
  type_payment: TYPE_PAYMENT
  note?: string
  address: TAddessProps
  status: STATUS_ORDER
  transaction_id: ObjectId
  created_at?: Date
  updated_at?: Date
  constructor(order: TOrderProps) {
    const date = new Date()
    this._id = order._id
    this.user_id = order.user_id
    this.products = order.products
    this.total = order.total
    this.type_payment = order.type_payment
    this.note = order.note || ''
    this.address = order.address
    this.status = order.status
    this.transaction_id = order.transaction_id
    this.created_at = order.created_at || date
    this.updated_at = order.updated_at || date
  }
}