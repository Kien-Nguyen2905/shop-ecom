import { useDispatch } from 'react-redux';
import { THUNK_STATUS } from '../../constants';
import { useMainContext } from '../../context/MainConTextProvider';
import { AppDispatch, useSelector } from '../../store/store';
import { addToCart } from '../../store/middlewares/cartMiddleware';
import { TAddcartPayload } from './tyings';
import { showToast } from '../../libs';

export const useProductItem = () => {
  const { checkAuthen, openModal } = useMainContext();
  const dispatch = useDispatch<AppDispatch>();
  const { updateStatus } = useSelector((state) => state.cart);
  const onAddToCart = async (payload: TAddcartPayload) => {
    if (!checkAuthen) {
      openModal();
    } else if (payload && updateStatus !== THUNK_STATUS.pending) {
      try {
        const res = await dispatch(addToCart(payload)).unwrap();
        if (res._id) {
          showToast({
            type: 'success',
            message: 'Successfully',
          });
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  };
  return { onAddToCart };
};
