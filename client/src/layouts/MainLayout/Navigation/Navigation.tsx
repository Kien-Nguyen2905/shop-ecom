import React from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaShopify } from 'react-icons/fa';
import { CUSTOMER_PATHS } from '../../../constants';
const Navigation = () => {
  return (
    <div className="border border-b-bBottom">
      <div className="container flex items-center justify-between text-black font-PpMd">
        <Link to={CUSTOMER_PATHS.ROOT} className="w-12 h-12 cursor-pointer">
          <FaShopify className="object-cover w-full h-full text-primary" />
        </Link>
        <div className="cursor-pointer ">
          <ul className="flex items-center justify-center">
            <Link to={'/'} className="px-4 py-7">
              HOME
            </Link>
            <Link to={'/'} className="px-4 py-7">
              ABOUT US
            </Link>
            <Link to={'/'} className="px-4 py-7">
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
            <CiSearch size={25} />
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
