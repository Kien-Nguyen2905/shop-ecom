import { TYPE_PAYMENT } from '~/constants/enum'

export type TCreateTransactionPayload = {
  user_id: string
  order_id: string
  type_payment: TYPE_PAYMENT
  value: number
  content?: string
}

export type TTransactionSepayQuery = {
  content: string
  value: string
  user_id: string
}
