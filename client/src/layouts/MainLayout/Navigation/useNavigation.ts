import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { AppDispatch, useSelector } from '../../../store/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeCart } from '../../../store/middlewares/cartMiddleware';
import { handleError } from '../../../libs';
import { CUSTOMER_PATHS } from '../../../constants';

export const useNavigation = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const { cartInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue(urlParams.get('search') || '');
  }, [search]);
  const onSearch = debounce((value: string) => {
    // Add or update the 'search' parameter
    urlParams.set('search', value);

    // Set default values for other query parameters (if not present)
    if (!urlParams.has('limit')) {
      urlParams.set('limit', '6');
    }
    if (!urlParams.has('page')) {
      urlParams.set('page', '1');
    }

    // Construct the full URL path including the updated query parameters
    const newUrl = `${CUSTOMER_PATHS.PRODUCT}?${urlParams.toString()}`;

    // Navigate to the new URL with updated query parameters
    navigate(newUrl);
  }, 700);

  // Handle input change and update the search state
  const handleInputChange = (value: string) => {
    setSearchValue(value); // Update search state
    onSearch(value); // Call onSearch to update the URL
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

  return {
    searchValue, // Provide searchValue state for input field
    handleInputChange, // Provide handleInputChange to bind to input field
    cartInfo,
    isDropdownVisible,
    setDropdownVisible,
    handleRemoveCart,
    setSearchValue,
  };
};
