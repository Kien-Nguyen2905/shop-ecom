import { useSpring } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ADMIN_PATHS, LOCAL_STORAGE } from '../../constants';
import { profileUser } from '../../store/middlewares/authMiddleWare';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getCart } from '../../store/middlewares/cartMiddleware';
import { getWishlist } from '../../store/middlewares/wishlistMiddleWare';
import { getOrder } from '../../store/middlewares/orderMiddleWare';
import { handleError } from '../../libs';
export const useMainLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const springProps = useSpring({
    opacity: isLoading ? 0 : 1,
    from: { opacity: 0 },
  });
  const handleNavigateAdmin = async () => {
    try {
      const res = await dispatch(profileUser()).unwrap();
      if (res.data.role === 0) {
        navigate(ADMIN_PATHS.ROOT);
      }
    } catch (error) {
      handleError({
        error,
      });
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    if (localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)) {
      handleNavigateAdmin();
      dispatch(getCart());
      dispatch(getWishlist());
      dispatch(getOrder());
    }
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return { springProps };
};
