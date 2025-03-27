import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from '../../store/store';
import { LOCAL_STORAGE } from '../../constants';

const CustomerRoute = ({ redirectPath = '/' }: { redirectPath: string }) => {
  const { profile } = useSelector((store) => store.auth);
  if (!localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN) && !profile) {
    return <Navigate to={redirectPath} />;
  }
  return (
    profile && (
      <>
        <Outlet />
      </>
    )
  );
};

export default CustomerRoute;
