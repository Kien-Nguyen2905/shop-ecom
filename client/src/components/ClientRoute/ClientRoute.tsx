import { Outlet } from 'react-router-dom';

const ClientRoute = ({ redirectPath = '/' }: { redirectPath: string }) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ClientRoute;
