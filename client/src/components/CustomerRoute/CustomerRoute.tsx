import { Outlet } from 'react-router-dom';

const CustomerRoute = ({ redirectPath = '/' }: { redirectPath: string }) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default CustomerRoute;
