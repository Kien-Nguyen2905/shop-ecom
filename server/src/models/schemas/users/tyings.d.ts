import { ObjectId } from 'mongodb'
import { UserVerify } from '~/constants/enum'

export type TAddessProps = {
  province?: string
  district?: string
  village?: string
  street_address?: string
}
export type TUserProps = {
  _id?: ObjectId
  email: string
  password: string
  role?: ROLE
  forgot_password?: string
  full_name?: string
  phone?: string
  address?: TAddessProps
  avatar?: string
  wishlist?: ObjectId
  created_at?: Date
  updated_at?: Date
}
