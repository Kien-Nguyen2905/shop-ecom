import { ObjectId } from 'mongodb'
import { ROLE } from '~/constants/enum'
import { TAddessProps, TUserProps } from '~/models/schemas/users/type'

export default class User {
  _id?: ObjectId
  email: string
  password: string
  role?: ROLE
  forgot_password?: string
  full_name?: string
  phone?: string
  address?: TAddessProps
  wishlist?: ObjectId
  created_at?: Date
  updated_at?: Date
  constructor(user: TUserProps) {
    const date = new Date()
    this._id = user._id
    this.email = user.email
    this.password = user.password
    this.role = user.role || ROLE.User
    this.forgot_password = user.forgot_password || ''
    this.full_name = user.full_name || ''
    this.phone = user.phone || ''
    this.address = user.address || {}
    this.wishlist = user.wishlist || undefined
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
  }
}
