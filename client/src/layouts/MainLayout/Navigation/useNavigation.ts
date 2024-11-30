import { useNavigate } from 'react-router-dom';
import { CUSTOMER_PATHS } from '../../../constants';
import { debounce } from 'lodash';
import { AppDispatch, useSelector } from '../../../store/store';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeCart } from '../../../store/middlewares/cartMiddleware';
import { handleError } from '../../../libs';

export const useNavigation = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const { cartInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const onSearch = debounce((value: string) => {
    navigate(`${CUSTOMER_PATHS.PRODUCT}?search=${value}`);
  }, 700);
  const handleRemoveCart = async (variant_id: string) => {
    try {
      await dispatch(removeCart({ item_id: variant_id })).unwrap();
    } catch (error) {
      handleError({
        error,
      });
    }
  };
  return {
    onSearch,
    cartInfo,
    isDropdownVisible,
    setDropdownVisible,
    handleRemoveCart,
  };
};
