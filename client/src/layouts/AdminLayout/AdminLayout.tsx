import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CUSTOMER_PATHS, LOCAL_STORAGE } from '../../constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { profileUser } from '../../store/middlewares/authMiddleWare';
import { AppDispatch, useSelector } from '../../store/store';

const AdminLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
    <div className="w-full h-screen">
      <Header />
      <div className="flex w-full h-full">
        <Sidebar />
        <div className="flex-1 px-5 pt-[60px] xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
