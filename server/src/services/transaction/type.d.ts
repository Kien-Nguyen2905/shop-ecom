import { ObjectId } from 'mongodb'
import { TYPE_PAYMENT } from '~/constants/enum'

export type TCreateTransactionPayload = {
  user_id: string
  type_payment: TYPE_PAYMENT
  value: number
  content?: string
}

export type TTransactionSepayQuery = {
  content: string
  value: string
  user_id: string
}

export type TTransaction = {
  _id: ObjectId
  user_id: ObjectId
  type_payment: number
  method_payment: string
  value: number
  content: string
  created_at: Date
  updated_at: Date
}

export type TTransactionResponse = TTransaction[]
