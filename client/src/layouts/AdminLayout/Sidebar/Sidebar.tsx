import { NavLink } from 'react-router-dom';
import { ADMIN_PATHS, LOCAL_STORAGE } from '../../../constants';
import { NAV_LINKS } from '../../../constants/admin';
import { CiLogout } from 'react-icons/ci';
import { logout } from '../../../store/middlewares/authMiddleWare';
import { handleError, showToast } from '../../../libs';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
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
    <div className="w-64 bg-white border-e border-gray-200 pt-7 pb-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
      <div className="px-6">
        <a className="flex-none text-xl font-semibold text-black focus:outline-none focus:opacity-80">
          Shop-ecom
        </a>
      </div>
      <nav className="flex flex-col flex-wrap w-full p-6 hs-accordion-group">
        <ul className="space-y-1.5">
          {NAV_LINKS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `hs-accordion-toggle justify-between w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${
                    isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-700'
                  } hover:bg-gray-100 focus:outline-none focus:bg-gray-100`
                }
                // Add exact logic for the root route if necessary
                end={item.to === ADMIN_PATHS.ROOT}
              >
                <div className="flex items-center gap-3">
                  <item.icon></item.icon>
                  {item.label}
                </div>
              </NavLink>
            </li>
          ))}
          <li>
            <div
              onClick={handleLogout}
              className={`hs-accordion-toggle cursor-pointer justify-between w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${'text-gray-700'} hover:bg-gray-100 focus:outline-none focus:bg-gray-100`}
            >
              <div className="flex items-center gap-3">
                <CiLogout />
                Logout
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
