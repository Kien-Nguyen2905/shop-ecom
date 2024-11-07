import dotenv from 'dotenv'
dotenv.config()
type TEnv = {
  CORS_ORIGIN: string
  PORT: string
  DB_CONNECT: string
  DB_NAME: string
  API_VERSION: string
  PASSWORD_SECRET: string
  JWT_SECRET_ACCESS_TOKEN: string
  JWT_SECRET_REFRESH_TOKEN: string
  JWT_SECRET_EMAIL_VERIFY_TOKEN: string
  JWT_SECRET_FORGOT_PASSWORD_TOKEN: string
  ACCESS_TOKEN_EXPIRES_IN: string
  REFRESH_TOKEN_EXPIRES_IN: string
  EMAIL_VERIFY_TOKEN_EXPIRES_IN: string
  FORGOT_PASSWORD_TOKEN_EXPIRES_IN: string
  USERS_COLLECTION: string
  TOKENS_COLLECTION: string
  VERIFICATIONS_COLLECTION: string
  PASSWORD_RESETS_COLLECTION: string
  PROVINCE_COLLECTION: string
  DISTRICT_COLLECTION: string
  WARD_COLLECTION: string
  CATEGORY_COLLECTION: string
  BRAND_COLLECTION: string
  PRODUCT_COLLECTION: string
  INFORMATION_COLLECTION: string
  WAREHOUSE_COLLECTION: string
  CART_COLLECTION: string
  WISHLIST_COLLECTION: string
  HOST: string
}
export const env: TEnv = {
  CORS_ORIGIN: process.env.CORS_ORIGIN as string,
  PORT: process.env.PORT as string,
  DB_CONNECT: process.env.CONNECT_STRING_MG as string,
  DB_NAME: process.env.DB_NAME as string,
  API_VERSION: process.env.API_VERSION as string,
  PASSWORD_SECRET: process.env.PASSWORD_SECRET as string,
  JWT_SECRET_ACCESS_TOKEN: process.env.PASSWORD_SECRET as string,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
  JWT_SECRET_REFRESH_TOKEN: process.env.PASSWORD_SECRET as string,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
  JWT_SECRET_EMAIL_VERIFY_TOKEN: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
  EMAIL_VERIFY_TOKEN_EXPIRES_IN: process.env.EMAIL_VERIFY_TOKEN_EXPIRES_IN as string,
  JWT_SECRET_FORGOT_PASSWORD_TOKEN: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string,
  FORGOT_PASSWORD_TOKEN_EXPIRES_IN: process.env.FORGOT_PASSWORD_TOKEN_EXPIRES_IN as string,
  USERS_COLLECTION: process.env.DB_USERS_COLLECTION as string,
  TOKENS_COLLECTION: process.env.DB_TOKENS_COLLECTION as string,
  VERIFICATIONS_COLLECTION: process.env.DB_VERIFICATIONS_COLLECTION as string,
  PASSWORD_RESETS_COLLECTION: process.env.DB_PASSWORD_RESETS_COLLECTION as string,
  PROVINCE_COLLECTION: process.env.DB_PROVINCE_COLLECTION as string,
  DISTRICT_COLLECTION: process.env.DB_DISTRICT_COLLECTION as string,
  WARD_COLLECTION: process.env.DB_WARD_COLLECTION as string,
  CATEGORY_COLLECTION: process.env.DB_CATEGORY_COLLECTION as string,
  BRAND_COLLECTION: process.env.DB_BRAND_COLLECTION as string,
  PRODUCT_COLLECTION: process.env.DB_PRODUCT_COLLECTION as string,
  INFORMATION_COLLECTION: process.env.DB_INFORMATION_COLLECTION as string,
  WAREHOUSE_COLLECTION: process.env.DB_WAREHOUSE_COLLECTION as string,
  CART_COLLECTION: process.env.DB_CART_COLLECTION as string,
  WISHLIST_COLLECTION: process.env.DB_WISHLIST_COLLECTION as string,
  HOST: process.env.HOST as string
}
