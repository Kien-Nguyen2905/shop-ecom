import { Outlet } from 'react-router-dom';
import { Sidebar } from './components';

const DashboardPage = () => {
  return (
    <div className="container">
      <div className="flex gap-[100px] pt-[100px]">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
