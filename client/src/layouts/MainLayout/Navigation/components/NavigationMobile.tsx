import ReactDOM from 'react-dom';
import { OverPlay } from '../../../../components';
import { NavLink } from 'react-router-dom';
import { CUSOTMER_NAV_LINKS, CUSTOMER_PATHS } from '../../../../constants';
import { CgClose } from 'react-icons/cg';
import { useMainContext } from '../../../../context/MainContextProvider';
import { useEffect } from 'react';

const NavigationMobile = () => {
  const { isOpenNav, toggleNavMobile: closeNavMobile } = useMainContext();

  useEffect(() => {
    const body = document.body;
    const root = document.getElementById('root')!;
    if (isOpenNav) {
      body.classList.toggle('no-scroll');
      root.classList.toggle('no-scroll');
    }

    return () => {
      body.classList.remove('no-scroll');
      root.classList.add('no-scroll');
    };
  }, [isOpenNav]);

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 w-full h-full bg-black bg-opacity-50 transition-opacity ${
        isOpenNav
          ? 'opacity-100 visible overflow-y-hidden'
          : 'opacity-0 invisible'
      }`}
    >
      <OverPlay />
      <div
        className={`h-screen w-[280px] md:w-[400px] bg-backPrimary absolute z-20 transition-transform duration-300 ${
          isOpenNav ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div
          onClick={closeNavMobile}
          className="w-[65px] h-[65px] md:w-[70px] md:h-[70px] p-5 overflow-hidden flex items-center justify-center absolute text-white cursor-pointer top-[3%] right-[-1%]"
        >
          <CgClose size={50} />
        </div>
        <ul className="pt-[100px] text-[12px] md:text-[14px] md:pt-[130px] uppercase">
          {CUSOTMER_NAV_LINKS.map((nav) => (
            <li
              onClick={closeNavMobile}
              key={nav.name}
              className="py-[10px] pl-[20px] md:py-[20px] md:pl-[30px] border-t-[0.1px] border-b-[0.1px] border-white border-opacity-8"
            >
              <NavLink
                to={nav.path}
                className={({ isActive }) =>
                  `${isActive ? 'text-primary' : 'text-white'}`
                }
                end={nav.path === CUSTOMER_PATHS.ROOT}
              >
                {nav.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document?.querySelector('body') as Element,
  );
};

export default NavigationMobile;
