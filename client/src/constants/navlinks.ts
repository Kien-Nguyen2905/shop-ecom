import { CUSTOMER_PATHS } from './paths';

export const CUSOTMER_NAV_LINKS = [
  { name: 'Home', path: CUSTOMER_PATHS.ROOT },
  { name: 'About Us', path: CUSTOMER_PATHS.ABOUT_US },
  { name: 'Product', path: CUSTOMER_PATHS.PRODUCT },
  { name: 'Contact Us', path: CUSTOMER_PATHS.CONTACTUS },
];

export const PROFILE_NAV_LINKS = [
  { name: 'Account Details', path: CUSTOMER_PATHS.DASHBOARD.INDEX },
  { name: 'Your Orders', path: CUSTOMER_PATHS.DASHBOARD.ORDER },
  { name: 'Wishlist', path: CUSTOMER_PATHS.DASHBOARD.WISHLIST },
];
