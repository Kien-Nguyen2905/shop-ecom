import { Link, NavLink } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaShopify } from 'react-icons/fa';
import { CUSOTMER_NAV_LINKS, CUSTOMER_PATHS } from '../../../constants';
import Input from '../../../components/Input/Input';
import { useNavigation } from './useNavigation';
import { DropdownCart } from './components';

const Navigation = () => {
  const {
    searchValue, // Provide searchValue state for input field
    handleInputChange, // Provide handleInputChange to bind to input field
    cartInfo,
    isDropdownVisible,
    setDropdownVisible,
    handleRemoveCart,
  } = useNavigation();
  return (
    <div className="border border-b-bBottom">
      <div className="container flex items-center justify-between text-black font-PpMd">
        <Link to={CUSTOMER_PATHS.ROOT} className="w-12 h-12 cursor-pointer">
          <FaShopify className="object-cover w-full h-full text-primary" />
        </Link>
        <div className="cursor-pointer">
          <ul className="flex items-center justify-center">
            {CUSOTMER_NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-7 ${isActive ? 'text-primary' : ''}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <div className="absolute right-[15%]">
            <Input
              value={searchValue}
              className="py-[3px] pl-[10px] pr-[25px]"
              type="text"
              variant="normal"
              onChange={handleInputChange}
            />
            <CiSearch
              className="absolute right-0 -translate-y-1/2 top-1/2"
              size={25}
            />
          </div>
          <div
            className="relative cursor-pointer flex items-center justify-center gap-1 pl-5 py-[20px]"
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
          >
            <AiOutlineShoppingCart size={25} />
            {cartInfo?.products?.length! > 0 && (
              <span className="flex items-center justify-center w-5 h-5 text-[9px] text-center text-white rounded-full bg-primary">
                {cartInfo?.products?.length}
              </span>
            )}
            {isDropdownVisible &&
              cartInfo?.products &&
              cartInfo?.products?.length > 0 && (
                <DropdownCart
                  handleRemoveCart={handleRemoveCart}
                  {...cartInfo!}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
