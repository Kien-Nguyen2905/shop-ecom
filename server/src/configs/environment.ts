import dotenv from 'dotenv'
dotenv.config()
type TEnv = {
  DB_CONNECT: string
  PORT: string
  DB_NAME: string
  API_VERSION: string
  PASSWORD_SECRET: string
  JWT_SECRET_ACCESS_TOKEN: string
  JWT_SECRET_REFRESH_TOKEN: string
  JWT_SECRET_EMAIL_VERIFY_TOKEN: string
  ACCESS_TOKEN_EXPIRES_IN: string
  REFRESH_TOKEN_EXPIRES_IN: string
  EMAIL_VERIFY_TOKEN_EXPIRES_IN: string
  USERS_COLLECTION: string
  TOKENS_COLLECTION: string
}
export const env: TEnv = {
  DB_CONNECT: process.env.CONNECT_STRING_MG as string,
  PORT: process.env.PORT as string,
  DB_NAME: process.env.DB_NAME as string,
  API_VERSION: process.env.API_VERSION as string,
  PASSWORD_SECRET: process.env.PASSWORD_SECRET as string,
  JWT_SECRET_ACCESS_TOKEN: process.env.PASSWORD_SECRET as string,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
  JWT_SECRET_REFRESH_TOKEN: process.env.PASSWORD_SECRET as string,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
  JWT_SECRET_EMAIL_VERIFY_TOKEN: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
  EMAIL_VERIFY_TOKEN_EXPIRES_IN: process.env.EMAIL_VERIFY_TOKEN_EXPIRES_IN as string,
  USERS_COLLECTION: process.env.DB_USERS_COLLECTION as string,
  TOKENS_COLLECTION: process.env.DB_TOKENS_COLLECTION as string
}
