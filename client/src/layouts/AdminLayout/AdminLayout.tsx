import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CUSTOMER_PATHS, LOCAL_STORAGE } from '../../constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { profileUser } from '../../store/middlewares/authMiddleWare';
import { AppDispatch } from '../../store/store';

const AdminLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const { pathname } = useLocation();

  useEffect(() => {
    if (!role && role !== '0') {
      navigate(CUSTOMER_PATHS.ROOT);
    }
  }, [pathname]);
  useEffect(() => {
    if (!!localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)) {
      dispatch(profileUser());
    }
  }, []);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-screen">
        <Header />
        <div className="flex w-full h-full">
          <Sidebar />
          <div className="flex-1 px-10 pt-[100px]">
            <Outlet />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default AdminLayout;
