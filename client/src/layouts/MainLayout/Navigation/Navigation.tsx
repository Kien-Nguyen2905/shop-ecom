import { Link, NavLink } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaShopify } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { CUSOTMER_NAV_LINKS, CUSTOMER_PATHS } from '../../../constants';
import Input from '../../../components/Input/Input';
import { useNavigation } from './useNavigation';
import { DropdownCart } from './components';

const Navigation = () => {
  const {
    watch,
    onSearch,
    control,
    cart,
    isDropdownVisible,
    setDropdownVisible,
    handleRemoveCart,
    toggleNavMobile,
  } = useNavigation();

  return (
    <div className="relative border border-b-bBottom">
      <div className="container flex items-center 2xl:h-[100px] justify-between text-black font-PpMd">
        <div className="flex items-center gap-3">
          <div className="flex xl:hidden">
            <RxHamburgerMenu
              size={50}
              onClick={toggleNavMobile}
              className="cursor-pointer w-[20px]"
            />
          </div>
          <Link
            to={CUSTOMER_PATHS.ROOT}
            className="hidden w-12 h-12 2xl:w-[60px] 2xl:h-[60px] cursor-pointer xl:block"
          >
            <FaShopify className="object-cover w-full h-full text-primary" />
          </Link>
        </div>
        <div className="absolute hidden -translate-x-1/2 -translate-y-1/2 cursor-pointer xl:flex left-1/2 top-1/2">
          <ul className="flex items-center justify-center uppercase">
            {CUSOTMER_NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-6 2xl:text-[20px] ${isActive ? 'text-primary' : ''}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="flex items-center">
          <div className="relative w-[200px] 2xl:w-[250px] hidden xl:block">
            <Input
              onChange={onSearch}
              name="search"
              control={control}
              value={watch('search')}
              classNameInput="!py-[3px] pr-[20px] 2xl:!py-[9px]"
              type="text"
            />
            <div className="absolute text-darkGrey w-[17px] h-[17px] 2xl:w-[30px] 2xl:h-[30px] flex justify-center items-center right-1 -translate-y-1/2 top-1/2">
              <CiSearch size={30} />
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div
              className="relative cursor-pointer flex items-center justify-center gap-1 pl-5 py-[20px]"
              onMouseEnter={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(false)}
            >
              <div className="w-[25px] text-darkGrey h-[25px] 2xl:w-[40px] 2xl:h-[40px] cursor-pointer flex items-center justify-center">
                <AiOutlineShoppingCart size={40} />
              </div>
              {cart?.products?.length! > 0 && (
                <span className="flex items-center mb-5 justify-center 2xl:w-7 2xl:h-7 2xl:text-[16px] w-5 h-5 text-[9px] text-center text-white rounded-full bg-primary">
                  {cart?.products?.length}
                </span>
              )}
              {isDropdownVisible &&
                cart?.products &&
                cart?.products?.length > 0 && (
                  <DropdownCart
                    handleRemoveCart={handleRemoveCart}
                    {...cart!}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
