import { AiOutlineHome } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { BsBox } from 'react-icons/bs';
import { FaMoneyCheck, FaRegUser } from 'react-icons/fa';
import { LiaProductHunt } from 'react-icons/lia';
import { MdOutlineCategory } from 'react-icons/md';
import { PiWarehouse } from 'react-icons/pi';
import { TbBrandDatabricks } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import { ADMIN_PATHS } from '../../../constants';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-e border-gray-200 pt-7 pb-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
      <div className="px-6">
        <a className="flex-none text-xl font-semibold text-black focus:outline-none focus:opacity-80">
          Shop-ecom
        </a>
      </div>
      <nav className="flex flex-col flex-wrap w-full p-6 hs-accordion-group">
        <ul className="space-y-1.5">
          <li>
            <NavLink
              to={ADMIN_PATHS.ROOT}
              className="hs-accordion-toggle justify-between hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              <div className="flex gap-3">
                <AiOutlineHome size={20} />
                Dashboard
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ADMIN_PATHS.CATEGORY}
              className="hs-accordion-toggle justify-between hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              <div className="flex gap-3">
                <MdOutlineCategory size={20} />
                Catgory
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ADMIN_PATHS.BRAND}
              className="hs-accordion-toggle justify-between hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              <div className="flex gap-3">
                <TbBrandDatabricks size={20} />
                Brand
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ADMIN_PATHS.PRODUCT}
              className="hs-accordion-toggle justify-between hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              <div className="flex gap-3">
                <LiaProductHunt size={20} />
                Product
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ADMIN_PATHS.WAREHOUSE}
              className="hs-accordion-toggle justify-between hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              <div className="flex gap-3">
                <PiWarehouse size={20} />
                Warehouse
              </div>
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              className="hs-accordion-toggle justify-between hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              <div className="flex gap-3">
                <BsBox size={20} />
                Order
              </div>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="hs-accordion-toggle justify-between hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              <div className="flex gap-3">
                <FaMoneyCheck size={20} />
                Transaction
              </div>
            </button>
          </li>
          <li>
            <NavLink
              to={ADMIN_PATHS.CUSTOMER}
              className="hs-accordion-toggle justify-between hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              <div className="flex gap-3">
                <FaRegUser size={20} />
                Customer
              </div>
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              className="hs-accordion-toggle justify-between hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              <div className="flex gap-3">
                <BiCommentDetail size={20} />
                Review
              </div>
            </button>
            <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
              <ul className="pt-2 hs-accordion-group ps-3">
                <li>
                  <button
                    type="button"
                    className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  >
                    Sub Menu 1
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  >
                    Sub Menu 2
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
