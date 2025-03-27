import { FC } from 'react';
import { formatCurrency } from '../../../utils';
import { TSummaryCheckoutProps } from './tyings';

const SummaryCheckout: FC<TSummaryCheckoutProps> = ({
  total,
  subTotal,
  products,
  appliedPoint,
  earnPoint,
  discount,
}) => {
  return (
    <div className="p-[30px] w-full xl:w-[400px] border border-dashed border-darkGrey">
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
            <p className="text-black font-PpBold">{formatCurrency(discount)}</p>
          </div>
        )}
        {appliedPoint !== undefined && (
          <div className="flex justify-between pb-3 border-b border-darkGrey">
            <h3 className="text-black font-PpBold w-[200px]">Applied Point</h3>
            <p className="text-black font-PpBold">{earnPoint}</p>
            <p className="text-black font-PpBold">
              {'- '}
              {formatCurrency(appliedPoint)}
            </p>
          </div>
        )}
        <div className="flex justify-between pb-3">
          <h3 className="text-black font-PpBold">Total</h3>
          <p className="text-black font-PpBold">{formatCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCheckout;
