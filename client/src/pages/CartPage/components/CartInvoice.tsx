import { FC } from 'react';
import { TCartInvoice } from './tyings';
import { formatCurrency } from '../../../utils';
import { CUSTOMER_PATHS } from '../../../constants';
import { Link } from 'react-router-dom';
import { Button } from '../../../components';

const CartInvoice: FC<TCartInvoice> = ({ total, subTotal, products }) => {
  // const [earnPoint, setEarnPoint] = useState<number>(0);

  // const handleApplyEarnPoint = (appliedEarnPoint: number) => {
  //   setEarnPoint(appliedEarnPoint * 1000);
  // };

  return (
    <div className="">
      <div className="p-[30px] w-[400px] border border-dashed border-darkGrey">
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
              <p className="">{item.quantity}</p>
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
          <div className="flex justify-between pb-3 border-b border-darkGrey">
            <h3 className="text-black font-PpBold">Discount</h3>
            <p className="text-black font-PpBold">
              {'- '}
              {formatCurrency(subTotal - total)}
            </p>
          </div>
          {/* {earnPoint > 0 && (
          <div className="flex justify-between pb-3 border-b border-darkGrey">
            <h3 className="text-black font-PpBold">EarnPoint Applied</h3>
            <p className="text-black font-PpBold">
              {'- '}
              {formatCurrency(earnPoint)}
            </p>
          </div>
        )} */}
          <div className="flex justify-between pb-3">
            <h3 className="text-black font-PpBold">Total</h3>
            <p className="text-black font-PpBold">{formatCurrency(total)}</p>
          </div>
          {/* <ModalEarnPoint onApply={handleApplyEarnPoint} /> */}
        </div>
      </div>
      <Link to={CUSTOMER_PATHS.CHECKOUT} className="block pt-5 ml-auto w-max">
        <Button className="px-10" text="PROCEED TO CHECKOUT" />
      </Link>
    </div>
  );
};

export default CartInvoice;
