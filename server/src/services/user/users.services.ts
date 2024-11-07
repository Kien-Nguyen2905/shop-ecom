import { ObjectId } from 'mongodb'
import { env } from '~/configs/environment'
import { EVerification, ROLE } from '~/constants/enum'
import Token from '~/models/schemas/tokens/tokens.schemas'
import User from '~/models/schemas/users/users.schemas'
import databaseService from '~/services/database/database.services'
import {
  IAccessToken,
  IRefreshToken,
  TDecodeEmailToken,
  TLoginReqBody,
  TRefreshTokenPayload,
  TRegisterReqBody,
  TResetPasswordReqBody,
  TUpdateProfilePayload,
  TVerificationEmail,
  TVerifyForgotReqBody,
  TVerifyReqBody
} from '~/services/user/type'
import { hashPassword } from '~/utils/crypto'
import { decodeToken, signToken, verifyToken } from '~/utils/jwt'
import { sendVerification } from '~/utils/sendmail'
import Verification from '~/models/schemas/verifications/verifications.schemas'
import PasswordReset from '~/models/schemas/password-resets/password-resets.schemas'
import { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from '~/models/errors/errors'
import Cart from '~/models/schemas/carts/carts.schemas'
import Wishlist from '~/models/schemas/wishlists/wishlists.schemas'

class UserServices {
  async signAccessToken({ user_id, role }: IAccessToken) {
    return await signToken({
      payload: { user_id, role },
      privateKey: env.JWT_SECRET_ACCESS_TOKEN as string,
      options: {
        expiresIn: env.ACCESS_TOKEN_EXPIRES_IN as string
      }
    })
  }
  async signRefreshToken({ user_id, role, exp }: IRefreshToken) {
    if (exp) {
      return await signToken({
        payload: { user_id, role, exp },
        privateKey: env.JWT_SECRET_REFRESH_TOKEN as string
      })
    }
    return await signToken({
      payload: { user_id, role },
      privateKey: env.JWT_SECRET_REFRESH_TOKEN as string,
      options: {
        expiresIn: env.ACCESS_TOKEN_EXPIRES_IN as string
      }
    })
  }
  async signAPairToken({ user_id, role, exp }: IRefreshToken) {
    return Promise.all([this.signAccessToken({ user_id, role }), this.signRefreshToken({ user_id, role, exp })])
  }
  async signForgotPassword(email: string) {
    return await signToken({
      payload: { email },
      privateKey: env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string,
      options: {
        expiresIn: env.FORGOT_PASSWORD_TOKEN_EXPIRES_IN as string
      }
    })
  }
  private signEmailVerify({ full_name, email, password }: TRegisterReqBody) {
    return signToken({
      payload: {
        full_name,
        email,
        password
      },
      privateKey: env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
      options: {
        expiresIn: env.EMAIL_VERIFY_TOKEN_EXPIRES_IN
      }
    })
  }
  private async sendVerificationEmail({ email, token, type }: TVerificationEmail) {
    return sendVerification({ email, token, type })
  }
  private async sendVerificationForgotPassword({ email, token, type }: TVerificationEmail) {
    return sendVerification({ email, token, type })
  }
  async verifyEmail(payload: TVerifyReqBody) {
    const email_token = await this.signEmailVerify({
      full_name: payload.full_name,
      email: payload.email,
      password: hashPassword(payload.password)
    } as TVerifyReqBody)

    const verification = new Verification({
      email: payload.email,
      email_token
    })
    const result = await databaseService.verifications.insertOne(verification)
    if (!result.insertedId) {
      throw new InternalServerError()
    }
    await this.sendVerificationEmail({
      email: payload.email,
      token: email_token,
      type: EVerification.Email
    })
    return { email_token }
  }
  async reSendVerifyEmail(email: string) {
    const verificationRecord = await databaseService.verifications.findOne({ email })

    if (!verificationRecord) {
      throw new NotFoundError()
    }

    const decodedToken = await decodeToken<TVerifyReqBody>({ token: verificationRecord.email_token })

    const newEmailToken = await this.signEmailVerify(decodedToken!)

    const updateResult = await databaseService.verifications.updateOne(
      { email },
      { $set: { email_token: newEmailToken } }
    )

    if (!updateResult.modifiedCount) {
      throw new InternalServerError()
    }
    await this.sendVerificationEmail({
      email,
      token: newEmailToken,
      type: EVerification.Email
    })

    return { email_token: newEmailToken }
  }
  async register(email_token: string) {
    const user_id = new ObjectId()
    const user_payload = await verifyToken<TDecodeEmailToken>({
      token: email_token,
      secretOrPublicKey: env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string
    })
    const { email, full_name, password } = user_payload
    const user_verified = await databaseService.verifications.findOne({ email })
    if (!user_verified) {
      throw new NotFoundError()
    }
    const [access_token, refresh_token] = await this.signAPairToken({
      user_id,
      role: ROLE.User
    })
    const user = new User({
      _id: user_id,
      full_name,
      email,
      password
    })
    const token = new Token({ user_id, refresh_token: refresh_token })
    const cart = new Cart({ user_id })
    const wishlist = new Wishlist({ user_id })
    const result = await Promise.all([
      databaseService.users.insertOne(user),
      databaseService.tokens.insertOne(token),
      databaseService.wishlist.insertOne(wishlist),
      databaseService.carts.insertOne(cart),
      databaseService.verifications.deleteOne({ email_token })
    ])
    if (!result) {
      throw new InternalServerError()
    }
    return { access_token, refresh_token, role: ROLE.User }
  }
  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
  async login(payload: TLoginReqBody) {
    const { email, password } = payload
    const user = await databaseService.users.findOne({
      email,
      password: hashPassword(password)
    })
    if (!user) {
      throw new UnauthorizedError()
    }

    const [access_token, refresh_token] = await this.signAPairToken({
      user_id: user?._id,
      role: user?.role!
    })

    const result = await databaseService.tokens.insertOne(
      new Token({ user_id: user._id, refresh_token: refresh_token })
    )
    if (!result) {
      throw new InternalServerError()
    }
    return {
      access_token,
      refresh_token,
      role: user?.role
    }
  }
  async logout(refresh_token: string) {
    const refreshTokenExist = await databaseService.tokens.findOne({ refresh_token })
    if (!refreshTokenExist) {
      throw new NotFoundError()
    }
    const result = await databaseService.tokens.deleteOne({ refresh_token })
    if (!result.acknowledged) {
      throw new InternalServerError()
    }
    return {}
  }

  async forgotPassword(email: string) {
    const forgot_password_token = await this.signForgotPassword(email)
    const user = await databaseService.users.findOne({ email })
    if (!user) {
      throw new NotFoundError()
    }
    const password_reset = new PasswordReset({
      user_id: user?._id,
      email: email,
      password_token: forgot_password_token
    })

    const insertResult = await databaseService.passwordResets.insertOne(password_reset)

    if (!insertResult.insertedId) {
      throw new InternalServerError()
    }

    const emailResult = await this.sendVerificationForgotPassword({
      email,
      token: forgot_password_token,
      type: EVerification.ForgotPassword
    })

    if (!emailResult.messageId) {
      throw new InternalServerError()
    }

    return {
      forgot_password_token
    }
  }

  async reSendForgot(email: string) {
    const user = await databaseService.users.findOne({ email })
    if (!user) {
      throw new NotFoundError()
    }

    const forgot_password_token = await this.signForgotPassword(email)

    const existingReset = await databaseService.passwordResets.findOne({ email })

    if (!existingReset) {
      throw new NotFoundError()
    }
    const result = await databaseService.passwordResets.updateOne(
      { email },
      { $set: { password_token: forgot_password_token } }
    )
    if (!result.acknowledged) {
      throw new InternalServerError()
    }
    const emailResult = await this.sendVerificationForgotPassword({
      email,
      token: forgot_password_token,
      type: EVerification.ForgotPassword
    })

    if (!emailResult.messageId) {
      throw new InternalServerError()
    }
    return {
      forgot_password_token
    }
  }

  async resetPassword({ password, password_token }: TResetPasswordReqBody) {
    const existPasswordToken = await databaseService.passwordResets.findOne({
      password_token
    })

    if (!existPasswordToken) {
      throw new NotFoundError()
    }

    await verifyToken<TVerifyForgotReqBody>({
      token: password_token,
      secretOrPublicKey: env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string
    })

    const user = await databaseService.users.findOne({
      _id: existPasswordToken.user_id
    })
    if (!user) {
      throw new NotFoundError()
    }
    const result = await databaseService.users.updateOne(
      {
        _id: user?._id
      },
      {
        $set: {
          password: hashPassword(password)
        }
      }
    )
    if (!result.acknowledged) {
      throw new InternalServerError()
    }
    await databaseService.passwordResets.deleteOne({ password_token })
    return {}
  }

  async refreshToken({ exp, user_id, role, refresh_token }: TRefreshTokenPayload) {
    const [new_access_token, new_refresh_token] = await Promise.all([
      this.signAccessToken({ user_id: new ObjectId(user_id), role }),
      this.signRefreshToken({ user_id: new ObjectId(user_id), role, exp })
    ])
    await databaseService.tokens.updateOne(
      { refresh_token },
      {
        $set: {
          refresh_token: new_refresh_token
        }
      }
    )
    return {
      access_token: new_access_token,
      refresh_token: new_refresh_token
    }
  }

  async getProfile(user_id: string) {
    const result = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
    if (!result) {
      throw new NotFoundError()
    }
    const { email, role, full_name, phone, address, earn_point, total_paid, total_wishlist } = result
    return { email, role, full_name, phone, address, earn_point, total_paid, total_wishlist }
  }
  async updateProfile({ user_id, full_name, phone, address }: TUpdateProfilePayload) {
    if (!full_name || !phone || !address) {
      throw new BadRequestError()
    }
    const updateQuery: Record<string, any> = {}
    if (full_name) updateQuery.full_name = full_name
    if (phone) updateQuery.phone = phone
    if (address) updateQuery.address = address

    const result = await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      {
        $set: updateQuery
      }
    )
    if (!result.modifiedCount) {
      throw new InternalServerError()
    }
    return this.getProfile(user_id) || {}
  }

  async getAllUser() {
    return (await databaseService.users.find()) || []
  }
}
const userServices = new UserServices()
export default userServices
