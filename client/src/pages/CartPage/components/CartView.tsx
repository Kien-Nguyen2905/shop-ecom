import { VscClose } from 'react-icons/vsc';
import { QuantityInput } from '../../../components';
import { FC } from 'react';
import { TCartViewProps } from './tyings';
import { formatCurrency } from '../../../utils';

const CartView: FC<TCartViewProps> = ({
  products,
  handleAddCart,
  handleRemoveCart,
}) => {
  return (
    <div className="flex-1">
      {products?.length > 0 &&
        products?.map((item) => (
          <div className="py-[30px] max-w-[710px] flex items-center justify-between border-t border-borderGrey">
            <img src={item.image} className="w-[50px] h-[50px]" alt="" />
            <p className="w-[140px] min-h-full">{item.name}</p>
            <p className="">{item.color}</p>
            <p className="">
              {formatCurrency(item.price * (1 - item.discount))}
            </p>
            <QuantityInput
              isDisabled
              max={100}
              value={item.quantity}
              onChange={(value) =>
                handleAddCart({
                  product_id: item.product_id!,
                  variant_id: item.variant_id!,
                  quantity: value - item.quantity,
                })
              }
            />
            <p className="">
              {formatCurrency(item.price * item.quantity || 0)}
            </p>
            <div
              onClick={() => handleRemoveCart(item.variant_id)}
              className="cursor-pointer"
            >
              <VscClose size={20} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default CartView;
