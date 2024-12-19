import { Link, NavLink } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaShopify } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { CUSOTMER_NAV_LINKS, CUSTOMER_PATHS } from '../../../constants';
import Input from '../../../components/Input/Input';
import { useNavigation } from './useNavigation';
import { DropdownCart } from './components';
import { useState } from 'react';

const Navigation = () => {
  const {
    watch,
    onSearch,
    control,
    cartInfo,
    isDropdownVisible,
    setDropdownVisible,
    handleRemoveCart,
  } = useNavigation();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu

  return (
    <div className="border border-b-bBottom">
      <div className="container flex items-center justify-between text-black font-PpMd">
        {/* Logo */}
        <Link to={CUSTOMER_PATHS.ROOT} className="w-12 h-12 cursor-pointer">
          <FaShopify className="object-cover w-full h-full text-primary" />
        </Link>

        {/* Navigation Links */}
        <div className="hidden cursor-pointer lg:flex">
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

        <div className="flex items-center">
          {/* Cart */}
          <div className="absolute right-[15%]">
            <Input
              onChange={onSearch}
              name="search"
              control={control}
              value={watch('search')}
              className="pl-[10px] pr-[25px] xl:py-[3px] xl:pl-[10px] xl:pr-[25px]"
              type="text"
            />
            <CiSearch
              className="absolute right-[30px] -translate-y-1/2 top-1/2"
              size={25}
            />
          </div>
          <div className="relative flex items-center justify-center">
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

          {/* Hamburger Menu for Tablet and Mobile */}
          <div className="flex lg:hidden">
            <HiOutlineMenuAlt3
              size={30}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute z-10 w-full bg-white shadow-md lg:hidden">
          <ul className="flex flex-col items-start px-4 py-2">
            {CUSOTMER_NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `py-2 ${isActive ? 'text-primary' : ''}`
                }
                onClick={() => setIsMenuOpen(false)} // Close menu on link click
              >
                {link.name}
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navigation;
