import { useSpring, animated } from '@react-spring/web';
import { Outlet } from 'react-router-dom';
import { MainConTextProvider } from '../../context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Modal } from '../../components';
import { Header } from './Header';
import { Navigation } from './Navigation';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { LOCAL_STORAGE } from '../../constants';
import { profileUser } from '../../store/middlewares/authMiddleWare';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { Footer } from './Footer';
import { getCart } from '../../store/middlewares/cartMiddleware';
const MainLayout = () => {
  const queryClient = new QueryClient();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const springProps = useSpring({
    opacity: isLoading ? 0 : 1,
    from: { opacity: 0 },
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    if (!!localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)) {
      dispatch(profileUser());
      dispatch(getCart());
    }
    return () => {
      clearTimeout(timer);
    };
  }, []);
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
            <Footer />
          </div>
          <Modal />
        </animated.div>
      </MainConTextProvider>
    </QueryClientProvider>
  );
};

export default MainLayout;
