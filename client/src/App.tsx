import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ADMIN_PATHS, CUSTOMER_PATHS } from './constants';
import { NotFoundPage } from './pages/NotFoundPage';
import { Loading } from './components';
const MainLayout = lazy(() => import('./layouts/MainLayout/MainLayout'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout/AdminLayout'));
const OauthPage = lazy(() => import('./pages/OauthPage/OauthPage'));
const DashboardAdminPage = lazy(
  () => import('./pages/DashboardAdminPage/DashboardAdminPage'),
);
const CustomerRoute = lazy(
  () => import('./components/CustomerRoute/CustomerRoute'),
);
const CategoryAdminPage = lazy(
  () => import('./pages/CategoryAdminPage/CategoryAdminPage'),
);
const BrandAdminPage = lazy(
  () => import('./pages/BrandAdminPage/BrandAdminPage'),
);
const VerifyEmailPage = lazy(
  () => import('./pages/VerifyEmailPage/VerifyEmailPage'),
);
const ProductAdminPage = lazy(
  () => import('./pages/ProductAdminPage/ProductAdminPage'),
);
const WarehouseAdminPage = lazy(
  () => import('./pages/WarehouseAdminPage/WarehouseAdminPage'),
);
const CustomerAdminPage = lazy(
  () => import('./pages/CustomerAdminPage/CustomerAdminPage'),
);
const ReviewAdminPage = lazy(
  () => import('./pages/ReviewAdminPage/ReviewAdminPage'),
);
const ForgotPasswordPage = lazy(
  () => import('./pages/ForgotPasswordPage/ForgotPasswordPage'),
);
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage/AboutUsPage'));
const ContactUsPage = lazy(() => import('./pages/ContactUsPage/ContactUsPage'));
const ProductDetailPage = lazy(
  () => import('./pages/ProductDetailPage/ProductDetailPage'),
);
const CartPage = lazy(() => import('./pages/CartPage/CartPage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));
const AccountPage = lazy(() => import('./pages/AccountPage/AccountPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage/CheckoutPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage/PaymentPage'));
const OrderPage = lazy(() => import('./pages/OrderPage/OrderPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage/WishlistPage'));
const CheckoutSuccessPage = lazy(
  () => import('./pages/CheckoutSuccessPage/CheckoutSuccessPage'),
);
const OrderAdminPage = lazy(
  () => import('./pages/OrderAdminPage/OrderAdminPage'),
);
const TransactionAdminPage = lazy(
  () => import('./pages/TransactionAdminPage/TransactionAdminPage'),
);
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={CUSTOMER_PATHS.ROOT} element={<MainLayout />}>
          <Route path={CUSTOMER_PATHS.OAUTH} element={<OauthPage />} />
          <Route
            path={CUSTOMER_PATHS.FORGOT_PASSWORD}
            element={<ForgotPasswordPage />}
          />
          <Route path={CUSTOMER_PATHS.ROOT} element={<HomePage />} />
          <Route path={CUSTOMER_PATHS.PRODUCT} element={<ProductPage />} />
          <Route path={CUSTOMER_PATHS.ABOUT_US} element={<AboutUsPage />} />
          <Route path={CUSTOMER_PATHS.CONTACTUS} element={<ContactUsPage />} />
          <Route
            path={CUSTOMER_PATHS.PRODUCT_DETAIL}
            element={<ProductDetailPage />}
          />
          <Route
            path={CUSTOMER_PATHS.VERIFY_EMAIL}
            element={<VerifyEmailPage />}
          />
          <Route element={<CustomerRoute redirectPath={CUSTOMER_PATHS.ROOT} />}>
            <Route path={CUSTOMER_PATHS.CART} element={<CartPage />} />
            <Route
              path={CUSTOMER_PATHS.DASHBOARD.INDEX}
              element={<DashboardPage />}
            >
              <Route index element={<AccountPage />} />
              <Route
                path={CUSTOMER_PATHS.DASHBOARD.ORDER}
                element={<OrderPage />}
              />
              <Route
                path={CUSTOMER_PATHS.DASHBOARD.WISHLIST}
                element={<WishlistPage />}
              />
            </Route>
            <Route path={CUSTOMER_PATHS.CHECKOUT} element={<CheckoutPage />} />
            <Route path={CUSTOMER_PATHS.PAYMENT} element={<PaymentPage />} />

            <Route
              path={CUSTOMER_PATHS.CHECKOUT_SUCCESS}
              element={<CheckoutSuccessPage />}
            />
          </Route>
        </Route>
        <Route path={ADMIN_PATHS.ROOT} element={<AdminLayout />}>
          <Route path={ADMIN_PATHS.ROOT} element={<DashboardAdminPage />} />

          <Route path={ADMIN_PATHS.CATEGORY} element={<CategoryAdminPage />} />
          <Route path={ADMIN_PATHS.BRAND} element={<BrandAdminPage />} />
          <Route path={ADMIN_PATHS.PRODUCT} element={<ProductAdminPage />} />
          <Route
            path={ADMIN_PATHS.WAREHOUSE}
            element={<WarehouseAdminPage />}
          />
          <Route path={ADMIN_PATHS.CUSTOMER} element={<CustomerAdminPage />} />
          <Route path={ADMIN_PATHS.REVIEW} element={<ReviewAdminPage />} />
          <Route path={ADMIN_PATHS.ORDER} element={<OrderAdminPage />} />
          <Route
            path={ADMIN_PATHS.TRANSACTION}
            element={<TransactionAdminPage />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
