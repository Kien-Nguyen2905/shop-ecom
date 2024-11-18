import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './assets/styles/index.scss';
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

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path={CUSTOMER_PATHS.ROOT} element={<MainLayout />}>
          <Route path={CUSTOMER_PATHS.OAUTH} element={<OauthPage />} />

          <Route element={<CustomerRoute redirectPath={CUSTOMER_PATHS.ROOT} />}>
            <Route
              path={CUSTOMER_PATHS.VERIFY_EMAIL}
              element={<VerifyEmailPage />}
            />
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
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
