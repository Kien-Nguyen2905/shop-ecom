import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

const AdminLayout = () => {
  return (
    <div className="w-full h-screen">
      <Header />
      <div className="flex w-full h-full">
        <Sidebar />
        <div className="flex-1 px-10 pt-[100px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
