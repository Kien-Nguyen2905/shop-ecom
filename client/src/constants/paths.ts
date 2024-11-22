type TCustomerPaths = {
  ROOT: string;
  VERIFY_EMAIL: string;
  OAUTH: string;
  FORGOT_PASSWORD: string;
  PRODUCT: string;
};
type TAdminPaths = {
  ROOT: string;
  CATEGORY: string;
  BRAND: string;
  PRODUCT: string;
  WAREHOUSE: string;
  CUSTOMER: string;
  REVIEW: string;
};

export const CUSTOMER_PATHS: TCustomerPaths = {
  ROOT: '/',
  VERIFY_EMAIL: '/verify-email',
  OAUTH: '/oauth',
  FORGOT_PASSWORD: '/forgot-password',
  PRODUCT: '/product',
};
export const ADMIN_PATHS: TAdminPaths = {
  ROOT: '/admin',
  CATEGORY: '/admin/category',
  BRAND: '/admin/brand',
  PRODUCT: '/admin/product',
  WAREHOUSE: '/admin/warehouse',
  CUSTOMER: '/admin/customer',
  REVIEW: '/admin/review',
};
