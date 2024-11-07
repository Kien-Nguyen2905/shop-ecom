import { TLapAttributes } from '~/models/schemas/informations/type'
import { TFeatured, TVariant } from '~/models/schemas/products/type'

export type TProductPayload = {
  _id?: ObjectId
  name: string
  category_id: string
  brand_id: string
  price: number
  thumbnail: string
  description: string
  featured: TFeatured
  variants: TVariant[]
  rate: number
  minimum_stock: number
  attribute: TLapAttributes
}
export type TProductQuery = {
  page?: string
  limit?: string
  orderBy?: string
  order?: 'asc' | 'desc'
  dateFrom?: string
  dateTo?: string
  search?: string
  category?: string | string[]
  featured?: 'true' | 'false'
  onSale?: 'true' | 'false'
  topRated?: 'true' | 'false'
  minPrice?: string
  maxPrice?: string
  outOfStockLimit?: string
  inStock: ?string
}
