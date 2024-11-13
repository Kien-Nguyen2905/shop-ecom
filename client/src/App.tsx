import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './assets/styles/index.scss';
import { ADMIN_PATHS, CUSTOMER_PATHS } from './constants';
const MainLayout = lazy(() => import('./layouts/MainLayout/MainLayout'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout/AdminLayout'));
const ClientRoute = lazy(() => import('./components/ClientRoute/ClientRoute'));
const CategoryAdminPage = lazy(
  () => import('./pages/CategoryAdminPage/CategoryAdminPage'),
);

const VerifyEmailPage = lazy(
  () => import('./pages/VerifyEmailPage/VerifyEmailPage'),
);

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path={CUSTOMER_PATHS.ROOT} element={<MainLayout />}>
          <Route element={<ClientRoute redirectPath={CUSTOMER_PATHS.ROOT} />}>
            <Route
              path={CUSTOMER_PATHS.VERIFY_EMAIL}
              element={<VerifyEmailPage />}
            />
          </Route>
        </Route>
        <Route path={ADMIN_PATHS.ROOT} element={<AdminLayout />}>
          <Route path={ADMIN_PATHS.CATEGORY} element={<CategoryAdminPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
