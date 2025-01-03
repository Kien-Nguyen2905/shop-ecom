import { useDispatch } from 'react-redux';
import { THUNK_STATUS } from '../../constants';
import { useMainContext } from '../../context/MainConTextProvider';
import { AppDispatch, useSelector } from '../../store/store';
import { addToCart } from '../../store/middlewares/cartMiddleware';
import { TAddcartPayload } from './tyings';
import { TAddWishlistPayload } from '../../services/Wishlist/tyings';
import { updateWishlist } from '../../store/middlewares/wishlistMiddleWare';
import { handleError } from '../../libs';

export const useProductItem = () => {
  const { openModal } = useMainContext();
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state) => state.auth);
  // const { updateStatus } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const onAddToCart = async (payload: TAddcartPayload) => {
    if (!profile) {
      openModal();
    } else if (payload) {
      try {
        dispatch(addToCart(payload)).unwrap();
      } catch (error) {
        handleError({
          error,
        });
      }
    }
  };

  const onAddWishlist = async (payload: TAddWishlistPayload) => {
    if (!profile) {
      openModal();
    } else if (payload) {
      try {
        await dispatch(updateWishlist(payload)).unwrap();
      } catch (error) {
        handleError({
          error,
        });
      }
    }
  };

  return { onAddToCart, onAddWishlist, wishlist, dispatch, profile };
};
