import { Navigate } from 'react-router-dom';
import { BreadCrumb } from '../../components';
import { CUSTOMER_PATHS } from '../../constants';
import { TCart } from '../../store/reducers/tyings';
import { CartInvoice, CartView } from './components';
import { useCartPage } from './useCartPage';

const CartPage = () => {
  const { cart, handleAddCart, handleRemoveCart } = useCartPage();
  if (cart?.products?.length! <= 0)
    return <Navigate to={CUSTOMER_PATHS.ROOT} />;
  return (
    <div className="container md:h-screen">
      <BreadCrumb
        items={[
          { name: 'Home', path: CUSTOMER_PATHS.ROOT },
          { name: 'Cart', path: CUSTOMER_PATHS.CART },
        ]}
      />
      <div className="flex flex-col pb-[20px] gap-5 items-start justify-between xl:flex-row">
        <CartView
          handleRemoveCart={handleRemoveCart}
          handleAddCart={handleAddCart}
          {...(cart as TCart)}
        />
        <CartInvoice {...(cart as TCart)} />
      </div>
    </div>
  );
};

export default CartPage;
