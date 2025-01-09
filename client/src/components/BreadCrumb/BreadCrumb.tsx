import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { TBreadCrumbProps } from './tyings';

const BreadCrumb: FC<TBreadCrumbProps> = ({ items, className = '' }) => {
  return (
    <div className={`${className} flex gap-2 md:gap-4 py-[14px] xl:py-[30px]`}>
      {items.map((item, index) => (
        <React.Fragment key={item.path}>
          {index > 0 && <span>{'>'}</span>}
          {index === items.length - 1 ? (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `${isActive ? 'text-primary font-semibold' : ''}`
              }
            >
              {item.name}
            </NavLink>
          ) : (
            <Link to={item.path} className="hover:underline">
              {item.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BreadCrumb;
