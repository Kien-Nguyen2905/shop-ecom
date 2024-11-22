import { useNavigate } from 'react-router-dom';
import { CUSTOMER_PATHS } from '../../../constants';
import { debounce } from 'lodash';

export const useNavigation = () => {
  const navigate = useNavigate();
  const onSearch = debounce((value: string) => {
    navigate(`${CUSTOMER_PATHS.PRODUCT}?search=${value}`);
  }, 700);
  return { onSearch };
};
