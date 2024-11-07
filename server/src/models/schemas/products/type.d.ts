import { ObjectId } from 'mongodb'

export type TFeatured = {
  isPopular: boolean
  onSale: boolean
  isRated: boolean
}
export type TVariant = {
  _id: ObjectId
  color: string
  price: number
  rate: number
  stock: number
  images: string[]
  discount: number
}
export type TProductProps = {
  _id?: ObjectId
  name: string
  category_id: ObjectId
  brand_id: ObjectId
  thumbnail: string
  description: string
  featured: TFeatured
  variants: TVariant[]
  rate: number
  created_at?: Date
  updated_at?: Date
}
