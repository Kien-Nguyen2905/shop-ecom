import { ObjectId } from 'mongodb'
import { env } from '~/configs/environment'
import { ROLE } from '~/constants/enum'
import Token from '~/models/schemas/tokens/tokens.schemas'
import User from '~/models/schemas/users/users.schemas'
import databaseService from '~/services/database/database.services'
import { IAccessToken, IRefreshToken, TDecodeEmailToken, TRegisterReqBody } from '~/services/users/typings'
import { hashPassword } from '~/utils/crypto'
import { signToken, verifyToken } from '~/utils/jwt'

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
      console.log('exist refresh token')
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
  async verifyEmail(payload: TRegisterReqBody) {
    const email_token = await this.signEmailVerify(payload)
    return {
      email_token
    }
  }
  async register(email_token: string) {
    const user_payload = await verifyToken<TDecodeEmailToken>({
      token: email_token,
      secretOrPublicKey: env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string
    })
    const user_id = new ObjectId()

    const [access_token, refresh_token] = await this.signAPairToken({ user_id, role: ROLE.User })
    const user = new User({
      _id: user_id,
      full_name: user_payload.full_name,
      email: user_payload.email,
      password: hashPassword(user_payload.password)
    })
    const token = new Token({ user_id, refresh_token: refresh_token })
    await Promise.all([databaseService.users.insertOne(user), databaseService.tokens.insertOne(token)])

    return { access_token, refresh_token }
  }
  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
}
const userServices = new UserServices()
export default userServices
