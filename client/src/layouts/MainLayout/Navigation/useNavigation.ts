import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { AppDispatch, useSelector } from '../../../store/store';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeCart } from '../../../store/middlewares/cartMiddleware';
import { handleError } from '../../../libs';
import { CUSTOMER_PATHS } from '../../../constants';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import { useMainContext } from '../../../context/MainContextProvider';
export const useNavigation = () => {
  const { toggleNavMobile } = useMainContext();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { search } = useLocation();

  const urlParams = new URLSearchParams(search);
  const { control, watch } = useForm({
    defaultValues: {
      search: urlParams.get('search') || '',
    },
  });

  const searchValue = watch('search');

  const onSearch = debounce((value: string) => {
    // parse to object
    const currentParams = queryString.parse(search) as Record<
      string,
      string | string[]
    >;

    // update field search in object
    currentParams.search = value;

    if (!currentParams.limit) {
      currentParams.limit = '6';
    }
    if (!currentParams.page) {
      currentParams.page = '1';
    }

    // convert object to query string
    const newQueryString = queryString.stringify(currentParams);

    navigate(`${CUSTOMER_PATHS.PRODUCT}?${newQueryString}`);
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
    searchValue,
    cart,
    onSearch,
    isDropdownVisible,
    setDropdownVisible,
    handleRemoveCart,
    control,
    watch,
    toggleNavMobile,
  };
};
