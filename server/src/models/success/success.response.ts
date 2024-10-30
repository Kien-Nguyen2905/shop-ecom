import { HTTP_STATUS } from '~/constants/httpStatus'
import { TSuccessResponseProps } from '~/models/success/typings'

export class SuccessResponse {
  message: string
  statusCode: number
  data: Record<string, any>

  constructor({ message, statusCode = HTTP_STATUS.OK, data = {} }: TSuccessResponseProps) {
    this.message = message || 'Successfully'
    this.statusCode = statusCode
    this.data = data
  }

  send(respon: any) {
    return respon.status(this.statusCode).json(this)
  }
}

export class CREATED extends SuccessResponse {
  constructor({ message, statusCode = HTTP_STATUS.CREATED, data }: TSuccessResponseProps) {
    super({
      message,
      statusCode,
      data
    })
  }
}
