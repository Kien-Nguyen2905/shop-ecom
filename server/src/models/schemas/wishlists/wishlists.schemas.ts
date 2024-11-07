import { ObjectId } from 'mongodb'
import { TListItem, TWishlistProps } from '~/models/schemas/wishlists/type'

export default class Wishlist {
  _id?: ObjectId
  user_id: ObjectId
  list_item?: TListItem[]
  created_at?: Date
  updated_at?: Date
  constructor(wishlist: TWishlistProps) {
    const date = new Date()
    this._id = wishlist._id
    this.user_id = wishlist.user_id
    this.list_item = wishlist.list_item || []
    this.created_at = wishlist.created_at || date
    this.updated_at = wishlist.updated_at || date
  }
}
