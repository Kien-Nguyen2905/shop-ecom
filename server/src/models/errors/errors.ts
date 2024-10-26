import { HTTP_STATUS } from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/message'
import { TErrorsProps } from '~/models/errors/typings'

export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

export class EntityError extends ErrorWithStatus {
  errors: TErrorsProps
  constructor({ message = USERS_MESSAGES.VALIDATION_ERROR, errors }: { message?: string; errors: TErrorsProps }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
