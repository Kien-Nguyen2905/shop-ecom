import { FC } from 'react';
import { Button } from '../../../../components';
import DropdownCartItem from './DropdownCartItem';
import { TDropdownCartProps } from './tyings';
import { formatCurrency } from '../../../../utils';
import { Link } from 'react-router-dom';
import { CUSTOMER_PATHS } from '../../../../constants';

const DropdownCart: FC<TDropdownCartProps> = (dropdownCart) => {
  const cart = dropdownCart.products;
  return (
    <div className="z-10 top-[100%] px-[10px] pb-[15px] right-0 absolute w-[270px] 2xl:w-[340px] h-max bg-white">
      <div className="max-h-[270px] 2xl:max-h-[300px] overflow-hidden overflow-y-auto custom-scrollbar">
        {cart?.length > 0 &&
          cart?.map((item) => (
            <DropdownCartItem
              key={item.product_id}
              discount={item.discount}
              handleRemoveCart={dropdownCart.handleRemoveCart}
              product_id={item.product_id}
              image={item.image}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              variant_id={item.variant_id}
              color={item.color}
            />
          ))}
      </div>
      <div className="pt-[10px]">
        <div className="flex justify-between pb-[10px] ">
          <span>Total</span>
          <span className="text-darkGrey">
            {formatCurrency(dropdownCart.total)}
          </span>
        </div>
        <div className="flex justify-between">
          <Link to={CUSTOMER_PATHS.CART}>
            <Button className="px-[25px]" text="View cart" />
          </Link>
          <Link to={CUSTOMER_PATHS.CHECKOUT}>
            <Button className="px-[25px]" text="Check out" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DropdownCart;
