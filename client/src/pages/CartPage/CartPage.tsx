import { CartInvoice, CartView } from './components';
import { useCartPage } from './useCartPage';

const CartPage = () => {
  const { cartInfo, handleAddCart, handleRemoveCart } = useCartPage();
  return (
    <div className="container h-screen">
      <div className="flex items-start justify-between pt-[30px]">
        <CartView
          handleRemoveCart={handleRemoveCart}
          handleAddCart={handleAddCart}
          {...cartInfo!}
        />
        <CartInvoice {...cartInfo!} />
      </div>
    </div>
  );
};

export default CartPage;
