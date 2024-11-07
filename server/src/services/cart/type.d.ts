import { TProductCartProps } from '~/models/schemas/carts/type'

export interface TUpdateCartPayload extends TProductCartProps {
  user_id: string
}
