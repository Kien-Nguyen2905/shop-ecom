import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ADMIN_PATHS, LOCAL_STORAGE } from '../../../constants';
import { NAV_LINKS } from '../../../constants/admin';
import { CiLogout } from 'react-icons/ci';
import { logout } from '../../../store/middlewares/authMiddleWare';
import { handleError, showToast } from '../../../libs';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { RxHamburgerMenu } from 'react-icons/rx';
import { CgClose } from 'react-icons/cg';

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleLogout = async () => {
    try {
      const refresh_token = localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);
      if (refresh_token) {
        await dispatch(logout({ refresh_token }));
      } else {
        showToast({
          type: 'error',
          message: 'Error',
        });
      }
    } catch (error) {
      handleError({
        error,
      });
    }
  };

  return (
    <div
      className={`${
        isCollapsed ? 'w-20 flex flex-col items-center' : 'w-64'
      } bg-white border-e border-gray-200 pt-7 pb-10 transition-all duration-300 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300`}
    >
      <RxHamburgerMenu
        size={20}
        className={`cursor-pointer ${isCollapsed ? '' : 'hidden'}`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      />
      <nav className="flex flex-col flex-wrap w-full p-4">
        <ul className="space-y-1.5">
          <div
            className={`${
              isCollapsed ? 'hidden' : ''
            } w-[20px] h-[20px] flex items-center cursor-pointer justify-center ml-auto pb-4`}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <CgClose size={50} />
          </div>
          {NAV_LINKS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${
                    isCollapsed ? 'justify-center' : 'justify-between'
                  } w-full flex items-center py-2 px-2.5 text-[10px] md:text-sm rounded-lg ${
                    isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-700'
                  } hover:bg-gray-100 focus:outline-none focus:bg-gray-100`
                }
                end={item.path === ADMIN_PATHS.ROOT}
              >
                <div
                  className={`${
                    isCollapsed ? '' : 'gap-1 md:gap-3'
                  } flex items-center`}
                >
                  <item.icon />
                  {!isCollapsed && item.label}
                </div>
              </NavLink>
            </li>
          ))}
          <li>
            <div
              onClick={handleLogout}
              className={`cursor-pointer ${
                isCollapsed ? 'justify-center' : 'justify-between'
              } w-full flex items-center py-2 px-2.5 text-sm rounded-lg ${'text-gray-700'} hover:bg-gray-100 focus:outline-none focus:bg-gray-100`}
            >
              <div
                className={`${
                  isCollapsed ? '' : 'gap-1 md:gap-3'
                } flex items-center`}
              >
                <CiLogout />
                {!isCollapsed && 'Logout'}
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
