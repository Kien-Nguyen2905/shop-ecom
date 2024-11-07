import { ObjectId } from 'mongodb'
import { BadRequestError } from '~/models/errors/errors'

export const isInValidId = async (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw new BadRequestError()
  }
  return true
}
