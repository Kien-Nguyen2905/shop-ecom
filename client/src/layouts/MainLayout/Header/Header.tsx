import { LuUser2 } from 'react-icons/lu';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import useHeader from './userHeader';
import { FaShopify } from 'react-icons/fa';
import { CUSTOMER_PATHS, PROFILE_NAV_LINKS } from '../../../constants';

const Header = () => {
  const { showProfile, toggleProfile, openModal, profile, handleLogout } =
    useHeader();

  return (
    <div className="p-[14px] xl:px-[25px] min-w-full border-b-bBottom border">
      <div className="relative flex items-center justify-between w-full font-light font-PpLight text-darkGrey">
        <div className="flex items-center justify-center gap-2 transition cursor-pointer hover:text-primary">
          <FaShopify />
          <Link to={CUSTOMER_PATHS.ROOT} className="2xl:text-[20px]">
            Shop Ecom
          </Link>
        </div>
        <div
          className="flex items-center justify-center gap-2 transition cursor-pointer hover:text-primary"
          onMouseEnter={toggleProfile}
          onMouseLeave={toggleProfile}
        >
          {!profile ? (
            <>
              <LuUser2 />
              <div onClick={openModal} className="2xl:text-[20px]">
                Login | Register
              </div>
            </>
          ) : (
            <>
              <span className="2xl:text-[20px]">
                {profile.full_name ? profile.full_name : 'Guest'}
              </span>
              <RiArrowDropDownLine size={20} />
            </>
          )}
        </div>
        {profile && (
          <div
            className={`w-[180px] 2xl:w-[210px] z-10 h-[140px] 2xl:h-[180px] absolute bg-white top-full right-2 shadow-lg pt-5 pl-5 ${
              showProfile
                ? 'opacity-100 visible transition'
                : 'opacity-0 hidden transitions'
            } }`}
            onMouseEnter={toggleProfile}
            onMouseLeave={toggleProfile}
          >
            <ul className="flex flex-col gap-2 ">
              {PROFILE_NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className=" hover:text-primary 2xl:text-[20px]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  className="text-left hover:text-primary 2xl:text-[20px]"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
