import { ObjectId } from 'mongodb'
import { TInformationProps, TLapAttributes } from '~/models/schemas/informations/type'

export default class Information {
  _id?: ObjectId
  category_id: ObjectId
  product_id: ObjectId
  attribute: TLapAttributes
  created_at?: Date
  updated_at?: Date
  constructor(information: TInformationProps) {
    const date = new Date()
    this._id = information._id
    this.category_id = information.category_id
    this.product_id = information.product_id
    this.attribute = information.attribute
    this.created_at = information.created_at || date
    this.updated_at = information.updated_at || date
  }
}
