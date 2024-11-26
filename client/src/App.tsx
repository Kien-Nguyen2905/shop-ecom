import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ADMIN_PATHS, CUSTOMER_PATHS } from './constants';
const MainLayout = lazy(() => import('./layouts/MainLayout/MainLayout'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout/AdminLayout'));
const OauthPage = lazy(() => import('./pages/OauthPage/OauthPage'));
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
const ProductDetailPage = lazy(
  () => import('./pages/ProductDetailPage/ProductDetailPage'),
);
const CartPage = lazy(() => import('./pages/CartPage/CartPage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));
const AccountPage = lazy(() => import('./pages/AccountPage/AccountPage'));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path={CUSTOMER_PATHS.ROOT} element={<MainLayout />}>
          <Route path={CUSTOMER_PATHS.OAUTH} element={<OauthPage />} />
          <Route
            path={CUSTOMER_PATHS.FORGOT_PASSWORD}
            element={<ForgotPasswordPage />}
          />
          <Route path={CUSTOMER_PATHS.ROOT} element={<HomePage />} />
          <Route path={CUSTOMER_PATHS.PRODUCT} element={<ProductPage />} />
          <Route
            path={CUSTOMER_PATHS.PRODUCT_DETAIL}
            element={<ProductDetailPage />}
          />
          <Route element={<CustomerRoute redirectPath={CUSTOMER_PATHS.ROOT} />}>
            <Route
              path={CUSTOMER_PATHS.VERIFY_EMAIL}
              element={<VerifyEmailPage />}
            />
            <Route path={CUSTOMER_PATHS.CART} element={<CartPage />} />
            <Route
              path={CUSTOMER_PATHS.DASHBOARD.INDEX}
              element={<DashboardPage />}
            >
              <Route index element={<AccountPage />} />
            </Route>
          </Route>
        </Route>
        <Route path={ADMIN_PATHS.ROOT} element={<AdminLayout />}>
          <Route path={ADMIN_PATHS.CATEGORY} element={<CategoryAdminPage />} />
          <Route path={ADMIN_PATHS.BRAND} element={<BrandAdminPage />} />
          <Route path={ADMIN_PATHS.PRODUCT} element={<ProductAdminPage />} />
          <Route
            path={ADMIN_PATHS.WAREHOUSE}
            element={<WarehouseAdminPage />}
          />
          <Route path={ADMIN_PATHS.CUSTOMER} element={<CustomerAdminPage />} />
          <Route path={ADMIN_PATHS.REVIEW} element={<ReviewAdminPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
