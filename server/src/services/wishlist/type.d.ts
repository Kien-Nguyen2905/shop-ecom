export type TItemWishList = {
  product_id: string
  image: string
  name: string
  price: number
  discount: number
}
export type TUpdateWishListPayload = {
  user_id: string
  product_id: string
}
