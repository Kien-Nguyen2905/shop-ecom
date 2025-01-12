import { NavLink, useLocation } from 'react-router-dom';
import { ACCOUNT_ROUTES, LOCAL_STORAGE } from '../../../constants';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { logout } from '../../../store/middlewares/authMiddleWare';

const Sidebar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col gap-2 w-full xl:w-[290px]">
        {ACCOUNT_ROUTES.map((item) => (
          <NavLink
            key={item.route}
            to={item.route}
            className={`pb-5 transition-all border-b border-darkGrey hover:text-primary hover:pl-3 ${
              item.route === pathname ? 'text-primary font-bold pl-3' : ''
            }`}
          >
            {item.title}
          </NavLink>
        ))}
        <button
          onClick={async () =>
            await dispatch(
              logout({
                refresh_token: localStorage.getItem(
                  LOCAL_STORAGE.ACCESS_TOKEN,
                )!,
              }),
            )
          }
          className="text-left transition-all hover:text-primary hover:pl-3"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
