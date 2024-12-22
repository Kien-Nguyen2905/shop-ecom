import { CartInvoice, CartView } from './components';
import { useCartPage } from './useCartPage';

const CartPage = () => {
  const { cart, handleAddCart, handleRemoveCart } = useCartPage();
  return (
    <div className="container h-screen">
      <div className="flex items-start justify-between pt-[30px]">
        <CartView
          handleRemoveCart={handleRemoveCart}
          handleAddCart={handleAddCart}
          {...cart!}
        />
        <CartInvoice {...cart!} />
      </div>
    </div>
  );
};

export default CartPage;
