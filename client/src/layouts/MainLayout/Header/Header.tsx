import { LuUser2 } from 'react-icons/lu';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import useHeader from './userHeader';
import { FaShopify } from 'react-icons/fa';
import { CUSTOMER_PATHS } from '../../../constants';

const Header = () => {
  const { showModal, setShowModal, openModal, profile, handleLogout } =
    useHeader();
  return (
    <div className="p-[14px] border-b-bBottom border ">
      <div className="container relative flex items-center justify-between font-light font-PpLight text-darkGrey">
        <div className="flex items-center justify-center gap-2 transition cursor-pointer hover:text-primary">
          <FaShopify className="" />
          <Link to={CUSTOMER_PATHS.ROOT} className="">
            Shop Ecom
          </Link>
        </div>
        <div
          className="flex items-center justify-center gap-2 transition cursor-pointer hover:text-primary"
          onMouseEnter={() => setShowModal(true)}
          onMouseLeave={() => setShowModal(false)}
        >
          {!profile ? (
            <>
              <LuUser2 className="" />
              <button className="" onClick={openModal}>
                Login | Register
              </button>
            </>
          ) : (
            <>
              <span className="">
                {profile.full_name ? profile.full_name : 'Guest'}
              </span>
              <RiArrowDropDownLine size={20} className="" />
            </>
          )}
        </div>
        {profile && (
          <div
            className={`w-[180px] z-10 cursor-pointer h-[140px] absolute bg-white top-full right-2 shadow-lg pt-5 pl-5 ${
              showModal
                ? ' opacity-100 visible transition'
                : 'opacity-0 hidden transitions'
            } }`}
            onMouseEnter={() => setShowModal(true)}
            onMouseLeave={() => setShowModal(false)}
          >
            <ul className="flex flex-col gap-2">
              <Link
                to={CUSTOMER_PATHS.DASHBOARD.INDEX}
                className="hover:text-primary"
              >
                Account Details
              </Link>
              <Link
                to={CUSTOMER_PATHS.DASHBOARD.ORDER}
                className="hover:text-primary"
              >
                Your Orders
              </Link>
              <Link
                to={CUSTOMER_PATHS.DASHBOARD.WISHLIST}
                className="hover:text-primary"
              >
                Wishlist
              </Link>
              <button
                className="text-left hover:text-primary"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
