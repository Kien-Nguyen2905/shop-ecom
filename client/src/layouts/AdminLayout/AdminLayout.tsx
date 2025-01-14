import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CUSTOMER_PATHS, LOCAL_STORAGE } from '../../constants';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { profileUser } from '../../store/middlewares/authMiddleWare';
import { AppDispatch, useSelector } from '../../store/store';

const AdminLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Memoize the query client instance
  const queryClient = useMemo(() => new QueryClient(), []);

  useEffect(() => {
    const role = localStorage.getItem(LOCAL_STORAGE.ROLE);
    const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);

    // Redirect if not admin or no token
    if (!token || role === '1') {
      navigate(CUSTOMER_PATHS.ROOT);
      return;
    }
    dispatch(profileUser());
  }, [navigate, pathname]);

  if (!profile) {
    navigate(CUSTOMER_PATHS.ROOT);
    return;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-screen">
        <Header />
        <div className="flex w-full h-full">
          <Sidebar />
          <div className="flex-1 px-5 pt-[60px] xl:px-10">
            <Outlet />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default AdminLayout;
