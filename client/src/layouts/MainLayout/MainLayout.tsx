import { useSpring, animated } from '@react-spring/web';
import { Outlet } from 'react-router-dom';
import { MainConTextProvider } from '../../context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Modal } from '../../components';
import { Header } from './Header';
import { Navigation } from './Navigation';
import 'react-toastify/dist/ReactToastify.css';
const MainLayout = () => {
  const queryClient = new QueryClient();

  const springProps = useSpring({
    // opacity: isLoading ? 0 : 1,
    // from: { opacity: 0 },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <MainConTextProvider>
        <animated.div style={springProps}>
          <div className="relative w-full h-screen">
            <div className="">
              <Header />
              <Navigation />
            </div>
            <Outlet />
          </div>
          <Modal />
        </animated.div>
      </MainConTextProvider>
    </QueryClientProvider>
  );
};

export default MainLayout;
