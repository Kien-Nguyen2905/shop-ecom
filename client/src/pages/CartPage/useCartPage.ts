import { useDispatch } from 'react-redux';
import { AppDispatch, useSelector } from '../../store/store';
import { TAddcartPayload } from '../../components/ProductItem/tyings';
import { addToCart, removeCart } from '../../store/middlewares/cartMiddleware';
import { handleError } from '../../libs';
import { THUNK_STATUS } from '../../constants';
import { message } from 'antd';

export const useCartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, updateStatus } = useSelector((state) => state.cart);
  const handleAddCart = async (payload: TAddcartPayload) => {
    try {
      if (cart?._id && updateStatus !== THUNK_STATUS.pending) {
        const res = await dispatch(addToCart(payload)).unwrap();
        if (res.data._id) {
          message.success(res.message);
        }
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
  return { cart, handleAddCart, handleRemoveCart };
};
