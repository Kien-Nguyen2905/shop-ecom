import { Link } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaShopify } from 'react-icons/fa';
import { CUSTOMER_PATHS } from '../../../constants';
import Input from '../../../components/Input/Input';
import { useNavigation } from './useNavigation';
const Navigation = () => {
  const { onSearch } = useNavigation();
  return (
    <div className="border border-b-bBottom">
      <div className="container flex items-center justify-between text-black font-PpMd">
        <Link to={CUSTOMER_PATHS.ROOT} className="w-12 h-12 cursor-pointer">
          <FaShopify className="object-cover w-full h-full text-primary" />
        </Link>
        <div className="cursor-pointer ">
          <ul className="flex items-center justify-center">
            <Link to={CUSTOMER_PATHS.ROOT} className="px-4 py-7">
              HOME
            </Link>
            <Link to={'/'} className="px-4 py-7">
              ABOUT US
            </Link>
            <Link to={CUSTOMER_PATHS.PRODUCT} className="px-4 py-7">
              PRODUCT
            </Link>
            <Link to={'/'} className="px-4 py-7">
              BLOG
            </Link>
            <Link to={'/'} className="px-4 py-7">
              CONTACT US
            </Link>
          </ul>
        </div>
        <div className="cursor-pointer ">
          <div className="flex items-center justify-center">
            <div className="relative ">
              <Input
                className="py-[3px] pl-[10px] pr-[25px]"
                type="text"
                variant="normal"
                onChange={onSearch}
              />
              <CiSearch
                className="absolute right-0 -translate-y-1/2 top-1/2"
                size={25}
              />
            </div>
            <div className="flex items-center justify-center gap-1 pl-5">
              <AiOutlineShoppingCart size={25} />
              <span className="flex items-center justify-center w-5 h-5 text-[9px] text-center text-white rounded-full bg-primary">
                2
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
