type TCustomerPaths = {
  ROOT: string;
  VERIFY_EMAIL: string;
};
type TAdminPaths = {
  ROOT: string;
  CATEGORY: string;
  BRAND: string;
};

export const CUSTOMER_PATHS: TCustomerPaths = {
  ROOT: '/',
  VERIFY_EMAIL: '/verify-email',
};
export const ADMIN_PATHS: TAdminPaths = {
  ROOT: '/admin',
  CATEGORY: '/admin/category',
  BRAND: '/admin/brand',
};
