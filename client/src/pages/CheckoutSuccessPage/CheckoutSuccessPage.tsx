import { Button } from '../../components';
import { Link } from 'react-router-dom';
import { CUSTOMER_PATHS } from '../../constants';

const CheckoutSuccessPage = () => {
  return (
    <div className="container">
      <div className="flex flex-col text-center gap-5 items-center pt-[200px] h-screen">
        <h3 className="font-PpBold text-[20px] md:text-[34px]">
          Your Order is Completed!
        </h3>
        <p>
          Your order has been completed. Your order details are shown for your
          personal accont.
        </p>
        <Link to={CUSTOMER_PATHS.DASHBOARD.ORDER}>
          <Button text="VIEW ORDERS" />
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
