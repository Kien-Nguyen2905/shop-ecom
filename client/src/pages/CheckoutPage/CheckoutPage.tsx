import { CheckoutEarnPoint, CheckoutInfo } from './components';
import { useCheckoutPage } from './useCheckoutPage';
import SummaryCheckout from './components/SummaryCheckout';
import { BreadCrumb, Button } from '../../components';
import Input from '../../components/Input/Input';
import { Navigate } from 'react-router-dom';
import { CUSTOMER_PATHS } from '../../constants';
import { TCart } from '../../store/reducers/tyings';

const CheckoutPage = () => {
  const {
    checkoutInfoProps,
    cart,
    applyEarnPoint,
    appliedPoints,
    availablePoints,
    control,
    handleCheckout,
  } = useCheckoutPage();
  if (cart?.products?.length! <= 0)
    return <Navigate to={CUSTOMER_PATHS.ROOT} />;
  return (
    <div className="container">
      <BreadCrumb
        items={[
          { name: 'Home', path: CUSTOMER_PATHS.ROOT },
          { name: 'Checkout', path: CUSTOMER_PATHS.CHECKOUT },
        ]}
      />
      <form
        onSubmit={handleCheckout}
        className="flex flex-col xl:flex-row gap-12 pb-[30px]"
      >
        <div className="flex-1">
          {(availablePoints as number) > 0 && (
            <CheckoutEarnPoint
              availablePoints={availablePoints!}
              applyEarnPoint={applyEarnPoint}
              appliedPoints={appliedPoints}
            />
          )}
          <CheckoutInfo {...checkoutInfoProps} />
        </div>
        <div>
          <SummaryCheckout {...(cart as TCart)} />
          <div className="flex flex-col items-start gap-3 mt-5 ml-auto w-max">
            <div className="radio">
              <label className="flex items-center">
                <Input
                  type="radio"
                  name="type_payment"
                  control={control}
                  className="mr-2 w-max"
                  value={0}
                />
                <div>Cash on Delivery (COD)</div>
              </label>
              <label className="flex items-center mt-2">
                <Input
                  type="radio"
                  name="type_payment"
                  control={control}
                  className="mr-2 w-max"
                  value={1}
                />
                Banking
              </label>
            </div>
            <Button className="px-20" text="Check out"></Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
