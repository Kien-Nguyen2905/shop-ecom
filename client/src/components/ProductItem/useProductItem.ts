import { useDispatch } from 'react-redux';
import { useMainContext } from '../../context/MainContextProvider';
import { AppDispatch, useSelector } from '../../store/store';
import { addToCart } from '../../store/middlewares/cartMiddleware';
import { TAddcartPayload } from './tyings';
import { TUpdateWishlistPayload } from '../../services/Wishlist/tyings';
import { updateWishlist } from '../../store/middlewares/wishlistMiddleWare';
import { handleError } from '../../libs';

export const useProductItem = () => {
  const { toggleModal: openModal } = useMainContext();
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state) => state.auth);
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

  const onAddWishlist = async (payload: TUpdateWishlistPayload) => {
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
