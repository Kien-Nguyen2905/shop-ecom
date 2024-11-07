import { ObjectId } from 'mongodb'
import { UserVerify } from '~/constants/enum'

export type TAddessProps = {
  province?: string
  district?: string
  ward?: string
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
  earn_point?: number
  total_orders?: number
  total_paid?: number
  wishlist?: ObjectId
  created_at?: Date
  updated_at?: Date
}
