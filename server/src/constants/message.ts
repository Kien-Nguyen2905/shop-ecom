export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NAME_REQUIRED: 'Name is required',
  NAME_STRING: 'Full name must be a string',
  NAME_LENGTH: 'Name length must be from 1 to 100',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Email is invalid',
  EMAIL_NOT_EXIST: 'Email not exist',
  EMAIL_OR_PASSWORD_INCORRECT: 'Email or password is incorrect',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_STRING: 'Password must be a string',
  PASSWORD_LENGTH: 'Password length must be from 6 to 50',
  PASSWORD_STRONG:
    'Password must be 6-50 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD__STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH: 'Confirm password length must be from 6 to 50',
  CONFIRM_PASSWORD_STRONG:
    'Confirm password must be 6-50 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
  TOKEN_EMAIL_VERIFY: 'Token email verify is required',
  EMAIL_VERIFIED: 'Email have been verified',
  REGISTER_SUCCEED: 'Register successfully',
  LOGIN_SUCCEED: 'Login successfully',
  LOGOUT_SUCCEED: 'Logout successfully',
  LOGOUT_UNSUCCEED: 'Logout unsuccessfully',
  ACCESS_TOKEN_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_NOTFOUND: 'Refresh token not found',
  SEND_FORGOT_SUCCED: 'Send forgot password successfully',
  RESEND_FORGOT_SUCCED: 'Resend forgot password successfully',
  VERIFY_FORGOT_SUCCED: 'Verify forgot password token successfully',
  PASSWORD_TOKEN_REQUIRED: 'Password token is required',
  RESET_PASSWORD_SUCCED: 'Reset password successfully',
  PHONE_REQUIRED: 'Phone number is required.',
  PHONE_STRING: 'Phone number must be a string.',
  PHONE_INVALID: 'Phone number is invalid.',
  PHONE_LENGTH: 'Phone number must be between 10 and 15 characters.'
}
export const ADDRESS_MESSAGES = {
  PROVINCE_REQUIRED: 'Province is required.',
  PROVINCE_STRING: 'Province must be a string.',

  DISTRICT_REQUIRED: 'District is required.',
  DISTRICT_STRING: 'District must be a string.',

  WARD_REQUIRED: 'Ward is required.',
  WARD_STRING: 'Ward must be a string.',

  STREET_ADDRESS_REQUIRED: 'Street address is required.',
  STREET_ADDRESS_STRING: 'Street address must be a string.'
}
export const CATEGORY_MESSAGES = {
  CATEGORY_NAME_REQUIRED: 'Category name is required.',
  CATEGORY_NAME_STRING: 'Category name must be a string.',
  CATEGORY_NAME_EXISTS: 'Category name already exists.',
  CATEGORY_NAME_NOT_EXISTS: 'Category name does not exists.'
}
export const BRAND_MESSAGES = {
  BRAND_NAME_REQUIRED: 'Brand name is required.',
  BRAND_NAME_STRING: 'Brand name must be a string.',
  BRAND_NAME_EXISTS: 'Brand name already exists.',
  BRAND_NAME_NOT_EXISTS: 'Brand name does not exist.'
}

export const PRODUCT_MESSAGES = {
  PRODUCT_NAME_REQUIRED: 'Product name is required.',
  PRODUCT_NAME_STRING: 'Product name must be a string.',
  PRODUCT_NAME_EXISTS: 'Product name already exists.',
  PRODUCT_NAME_NOT_EXISTS: 'Product name does not exist.',
  PRODUCT_PRICE_REQUIRED: 'Product price is required.',
  PRODUCT_PRICE_INVALID: 'Product price is invalid.',
  PRODUCT_QUANTITY_REQUIRED: 'Product quantity is required.',
  PRODUCT_QUANTITY_INVALID: 'Product quantity is invalid.'
}

export const ORDER_MESSAGES = {
  ORDER_ID_REQUIRED: 'Order ID is required.',
  ORDER_NOT_FOUND: 'Order not found.',
  ORDER_STATUS_REQUIRED: 'Order status is required.',
  ORDER_STATUS_INVALID: 'Order status is invalid.'
}
export const POPULAR_MESSAGES = {
  SUCCESS_MESSAGES: 'Successfully',
  ERROR_MESSAGES: 'Failed'
}
