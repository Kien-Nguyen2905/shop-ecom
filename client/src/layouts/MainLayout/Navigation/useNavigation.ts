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
export const useNavigation = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { cartInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { search } = useLocation();

  const urlParams = new URLSearchParams(search);
  const { control, watch } = useForm({
    defaultValues: {
      search: urlParams.get('search') || '',
    },
  });

  let searchValue = watch('search');

  const onSearch = debounce((value: string) => {
    // Chuyển đổi query string hiện tại thành object
    const currentParams = queryString.parse(search) as Record<
      string,
      string | string[]
    >;

    // Thêm hoặc cập nhật trường search
    currentParams.search = value;

    // Thêm các query mặc định nếu chưa tồn tại
    if (!currentParams.limit) {
      currentParams.limit = '6';
    }
    if (!currentParams.page) {
      currentParams.page = '1';
    }

    // Chuyển đổi object thành query string
    const newQueryString = queryString.stringify(currentParams);

    // Điều hướng với `/product` và các query
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
    cartInfo,
    onSearch,
    isDropdownVisible,
    setDropdownVisible,
    handleRemoveCart,
    control,
    watch,
  };
};
