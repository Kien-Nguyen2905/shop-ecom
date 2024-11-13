import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const AdminLayout = () => {
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
