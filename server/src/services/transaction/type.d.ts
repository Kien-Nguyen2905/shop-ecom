import { ObjectId } from 'mongodb'
import { STATUS_ORDER, STATUS_TRANSACTION, TYPE_PAYMENT } from '~/constants/enum'

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
  order_id: ObjectId
  type_payment: TYPE_PAYMENT
  status: STATUS_TRANSACTION
  method_payment: string
  value: number
  content: string
  created_at: Date
  updated_at: Date
}

export type TWebhookData = {
  gateway: string // Tên cổng thanh toán (ví dụ: MBBank)
  transactionDate: string // Ngày giờ giao dịch (ISO format hoặc string)
  accountNumber: string // Số tài khoản
  subAccount: string | null // Tài khoản phụ (nếu có)
  code: string | null // Mã giao dịch (nếu có)
  content: string // Nội dung giao dịch
  transferType: 'in' | 'out' // Loại giao dịch: nạp tiền ('in') hoặc rút tiền ('out')
  description: string // Mô tả chi tiết giao dịch
  transferAmount: number // Số tiền giao dịch
  referenceCode: string // Mã tham chiếu giao dịch
  accumulated: number // Số dư tích lũy (nếu có)
  id: number // ID giao dịch (có thể là từ hệ thống webhook của ngân hàng)
}
export type TTransactionResponse = TTransaction[]
