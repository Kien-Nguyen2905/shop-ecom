import { Outlet } from 'react-router-dom';
import { Sidebar } from './components';
import { BreadCrumb } from '../../components';
import { CUSTOMER_PATHS } from '../../constants';

const DashboardPage = () => {
  return (
    <div className="container">
      <BreadCrumb
        items={[
          { name: 'Home', path: CUSTOMER_PATHS.ROOT },
          { name: 'Account', path: CUSTOMER_PATHS.DASHBOARD },
        ]}
      />
      <div className="flex flex-col xl:h-screen gap-10 xl:flex-row xl:gap-[100px] pb-[50px]">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
