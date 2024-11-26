import { NavLink } from 'react-router-dom';
import { ACCOUNT_ROUTES } from '../../../constants';

const Sidebar = () => {
  return (
    <div className="flex flex-col items-start h-[400px]">
      <div className="flex flex-col gap-2 w-[290px]">
        {ACCOUNT_ROUTES.map((item) => (
          <NavLink
            key={item.route}
            to={item.route}
            className={({ isActive }) =>
              `pb-5 transition-all border-b border-darkGrey hover:text-primary hover:pl-3 ${
                isActive ? 'text-primary font-bold' : ''
              }`
            }
          >
            {item.title}
          </NavLink>
        ))}
        <button className="text-left transition-all hover:text-primary hover:pl-3">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
