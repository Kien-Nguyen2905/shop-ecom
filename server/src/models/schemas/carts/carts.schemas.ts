import { ObjectId } from 'mongodb'
import { TCartProps, TProductCartProps } from '~/models/schemas/carts/type'

export default class Cart {
  _id?: ObjectId
  user_id: ObjectId
  product?: TProductCartProps[]
  created_at?: Date
  updated_at?: Date
  constructor(cart: TCartProps) {
    const date = new Date()
    this._id = cart._id
    this.user_id = cart.user_id
    this.product = cart.product || []
    this.created_at = cart.created_at || date
    this.updated_at = cart.updated_at || date
  }
}
