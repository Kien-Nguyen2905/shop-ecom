import { useDispatch } from 'react-redux';
import { AppDispatch, useSelector } from '../../store/store';
import { TAddcartPayload } from '../../components/ProductItem/tyings';
import { addToCart, removeCart } from '../../store/middlewares/cartMiddleware';
import { handleError } from '../../libs';
import { THUNK_STATUS } from '../../constants';

export const useCartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cartInfo, updateStatus } = useSelector((state) => state.cart);
  const handleAddCart = async (payload: TAddcartPayload) => {
    try {
      if (cartInfo?._id && updateStatus !== THUNK_STATUS.pending) {
        await dispatch(addToCart(payload)).unwrap();
      }
    } catch (error) {
      handleError({
        error,
      });
    }
  };
  const handleRemoveCart = async (variant_id: string) => {
    try {
      await dispatch(removeCart({ item_id: variant_id })).unwrap();
    } catch (error) {
      handleError({
        error,
      });
    }
  };
  return { cartInfo, handleAddCart, handleRemoveCart };
};
