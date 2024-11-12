import axios from 'axios'
import { ObjectId } from 'mongodb'
import { env } from 'process'
import { TYPE_PAYMENT } from '~/constants/enum'
import { BadRequestError, InternalServerError } from '~/models/errors/errors'
import Transaction from '~/models/schemas/transactions/transactions.schemas'
import databaseService from '~/services/database/database.services'
import { TCreateTransactionPayload, TTransactionSepayQuery } from '~/services/transaction/type'

class TransactionServices {
  async createTransaction({ order_id, user_id, type_payment, value, content }: TCreateTransactionPayload) {
    const _id = new ObjectId()
    const transaction = new Transaction({
      _id,
      user_id: new ObjectId(user_id),
      type_payment,
      method_payment: type_payment ? 'BANKING' : 'COD',
      value,
      content
    })
    const result = await databaseService.transactions.insertOne(transaction)
    if (!result.acknowledged || !result.insertedId) {
      throw new InternalServerError()
    }
    return this.getTransaction(_id.toString())
  }
  async getTransaction(_id: string) {
    return databaseService.transactions.findOne({ _id: new ObjectId(_id) }) || {}
  }
  async getTransactionSePay({ content, value, user_id }: TTransactionSepayQuery) {
    const response = await axios.get('https://my.sepay.vn/userapi/transactions/list', {
      params: {
        limit: 3
      },
      headers: {
        Authorization: `Bearer ${env.SEPAY_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    if (response.data.status === 200 && response.data.transactions) {
      const transactions = response.data.transactions
      const filteredTransactions = transactions.filter(
        (tx: any) =>
          tx.transaction_content &&
          tx.transaction_content.includes(content) &&
          parseFloat(tx.amount_in) === Number(value)
      )
      if (filteredTransactions.length > 0) {
        const order_id = new ObjectId()
        const orderArgument = {
          user_id,
          order_id: order_id.toString(),
          type_payment: TYPE_PAYMENT.BANKING,
          value: Number(value),
          content
        }
        await this.createTransaction(orderArgument)
        return filteredTransactions
      } else {
        throw new InternalServerError()
      }
    } else {
      throw new InternalServerError()
    }
  }
}

const transactionServices = new TransactionServices()

export default transactionServices
