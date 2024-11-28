import { CheckoutEarnPoint, CheckoutInfor, PaymentQR } from './components';
import { useCheckoutPage } from './useChecoutPage';
import SummaryCheckout from './components/SummaryCheckout';
import { Button } from '../../components';
import Input from '../../components/Input/Input';

const CheckoutPage = () => {
  const {
    checkoutInforProps,
    paymentQrProps,
    cartInfo,
    applyEarnPoint,
    appliedPoints,
    availablePoints,
    control,
    handlCheckout,
    handleSubmit,
  } = useCheckoutPage();

  return (
    <div className="container">
      <div className="flex h-screen gap-12 pt-10">
        <div className="flex-1">
          <CheckoutEarnPoint
            availablePoints={availablePoints!}
            applyEarnPoint={applyEarnPoint}
            appliedPoints={appliedPoints}
          />
          <CheckoutInfor {...checkoutInforProps!} />
        </div>
        <div className="">
          <SummaryCheckout {...cartInfo!} />

          <form
            onSubmit={handleSubmit(handlCheckout)}
            className="flex flex-col items-start gap-3 mt-5 ml-auto w-max"
          >
            <div className="radio">
              <label className="flex items-center">
                <Input
                  type="radio"
                  name="type_payment"
                  control={control}
                  className="mr-2 w-max"
                  value={0}
                />
                <div className="">Cash on Delivery (COD)</div>
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
          </form>
        </div>
      </div>
      <PaymentQR {...paymentQrProps} />
    </div>
  );
};

export default CheckoutPage;
