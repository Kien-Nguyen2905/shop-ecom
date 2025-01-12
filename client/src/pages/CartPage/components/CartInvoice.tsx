import { FC } from 'react';
import { TCartInvoice } from './tyings';
import { formatCurrency } from '../../../utils';
import { CUSTOMER_PATHS } from '../../../constants';
import { Link } from 'react-router-dom';
import { Button } from '../../../components';

const CartInvoice: FC<TCartInvoice> = ({
  total,
  subTotal,
  products,
  discount,
}) => {
  return (
    <div className="w-full md:w-[400px] ml-auto">
      <div className="p-[30px] border border-dashed border-darkGrey">
        <h3 className="block px-6 py-2 mx-auto mb-5 border border-dashed border-darkGrey w-max">
          INVOICE
        </h3>
        <div className="flex flex-col gap-2">
          {products?.map((item) => (
            <div
              className="flex justify-between pb-3 border-b border-darkGrey"
              key={item.name}
            >
              <h3 className="w-[200px]">{item.name}</h3>
              <p>{item.quantity}</p>
              <div className="flex flex-col">
                <p>{formatCurrency(item.price * (1 - item.discount))}</p>
                {item.discount > 0 && (
                  <p className="line-through">{formatCurrency(item.price)}</p>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-between pb-3 border-b border-darkGrey">
            <h3 className="text-black font-PpBold">SubTotal</h3>
            <p className="text-black font-PpBold">{formatCurrency(subTotal)}</p>
          </div>
          {discount > 0 && (
            <div className="flex justify-between pb-3 border-b border-darkGrey">
              <h3 className="text-black font-PpBold">Discount</h3>
              <p className="text-black font-PpBold">
                {formatCurrency(discount)}
              </p>
            </div>
          )}
          <div className="flex justify-between pb-3">
            <h3 className="text-black font-PpBold">Total</h3>
            <p className="text-black font-PpBold">{formatCurrency(total)}</p>
          </div>
        </div>
      </div>
      <Link
        to={
          products.length > 0 ? CUSTOMER_PATHS.CHECKOUT : CUSTOMER_PATHS.PRODUCT
        }
        className="block pt-5 ml-auto w-max"
      >
        <Button
          className="px-10"
          text={
            products.length > 0 ? 'PROCEED TO CHECKOUT' : 'BACK TO SHOPPING'
          }
        />
      </Link>
    </div>
  );
};

export default CartInvoice;
