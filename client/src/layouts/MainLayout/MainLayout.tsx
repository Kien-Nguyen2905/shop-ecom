import { animated } from '@react-spring/web';
import { Outlet } from 'react-router-dom';
import { MainContextProvider } from '../../context';
import { QueryClientProvider } from '@tanstack/react-query';
import { Modal } from '../../components';
import { Header } from './Header';
import { Navigation } from './Navigation';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from './Footer';
import { NavigationMobile } from './Navigation/components';
import { useMainLayout } from './useMainLayout';
const MainLayout = () => {
  const { queryClient, springProps } = useMainLayout();
  return (
    <QueryClientProvider client={queryClient}>
      <MainContextProvider>
        <animated.div style={springProps}>
          <div className="relative">
            <Header />
            <Navigation />
            <NavigationMobile />
            <Outlet />
            <Footer />
          </div>
          <Modal />
        </animated.div>
      </MainContextProvider>
    </QueryClientProvider>
  );
};

export default MainLayout;
