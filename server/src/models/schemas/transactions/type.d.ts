import { ObjectId } from 'mongodb'

export type TTransactionProps = {
  _id?: ObjectId
  user_id: ObjectId
  type_payment: TYPE_PAYMENT
  status: STATUS_TRANSACTION
  method_payment: string
  value: number
  content?: string
  created_at?: Date
  updated_at?: Date
}
