import { FC } from 'react';
import { TDropdownCartItemProps } from './tyings';
import { Link } from 'react-router-dom';
import { CUSTOMER_PATHS } from '../../../../constants';
import { formatCurrency } from '../../../../utils';
import { VscClose } from 'react-icons/vsc';
const DropdownCartItem: FC<TDropdownCartItemProps> = ({
  name,
  price,
  quantity,
  image,
  variant_id,
  product_id,
  color,
  handleRemoveCart,
  discount,
}) => {
  return (
    <div className="py-[10px] flex items-start justify-between border-b border-b-borderGrey">
      <div className="flex flex-col items-start justify-between">
        <div>
          <h3>{name}</h3>
          <h3>{color}</h3>
        </div>
        <div className="text-darkGrey">
          <span>{quantity}</span>
          {' x '}
          <span>{formatCurrency(price * (1 - discount))}</span>
          {discount > 0 && (
            <div className="line-through text-primary pl-[23px]">
              {formatCurrency(price)}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 cursor-pointer">
        <Link
          to={CUSTOMER_PATHS.PRODUCT + `/${product_id}?variant=${variant_id}`}
        >
          <img src={image} className="w-[40px] h-[40px] object-cover" alt="" />
        </Link>
        <VscClose onClick={() => handleRemoveCart(variant_id)} />
      </div>
    </div>
  );
};

export default DropdownCartItem;
