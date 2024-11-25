import { FC } from 'react';
import { TVariantProps } from './tyings';
import { formatCurrency } from '../../../utils';

const Variant: FC<TVariantProps> = ({
  isActive,
  images,
  color,
  price,
  discount,
  _id,
  onChangeVariant,
}) => {
  return (
    <div
      onClick={() => onChangeVariant?.(_id)}
      className={` ${
        isActive ? 'border-primary' : 'border-gray-300'
      } border-[0.5px] cursor-pointer gap-5 flex items-start w-max px-[20px] py-[4px] rounded-[6px]`}
    >
      <img src={images[0]} className="object-cover w-[30px] h-[30px]" alt="" />
      <div className="flex flex-col items-start">
        <p className={`${isActive ? 'text-primary' : ''} leading-0`}>{color}</p>
        <p className={`${isActive ? 'text-primary' : ''} leading-0`}>
          {formatCurrency(price * (1 - discount))}
        </p>
      </div>
    </div>
  );
};

export default Variant;
