import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from '../../store/store';

const CustomerRoute = ({ redirectPath = '/' }: { redirectPath: string }) => {
  const { profile } = useSelector((store) => store.auth);
  if (!!!profile) {
    return <Navigate to={redirectPath} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default CustomerRoute;
