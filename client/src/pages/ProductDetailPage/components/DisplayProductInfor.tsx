import { Descriptions, Rate } from 'antd';
import Variant from './Variant';
import { BsCartCheck } from 'react-icons/bs';
import { IoIosHeartEmpty } from 'react-icons/io';
import { Button, QuantityInput } from '../../../components';
import { FC } from 'react';
import { TDisplayProductInforProps } from './tyings';
import { formatCurrency } from '../../../utils';

const DisplayProductInfor: FC<TDisplayProductInforProps> = ({
  productData,
  onChangeVariant,
  variantId,
  quantityForm,
  categoryData,
  handleAddCart,
}) => {
  const variant = productData?.variants?.find((item) => item._id === variantId);
  if (!variant) return;
  return (
    <div className="flex flex-col flex-1 gap-4">
      <h3 className="font-bold text-[24px]">{productData?.name}</h3>
      <Rate disabled value={productData?.rate} />
      <div className="flex items-center gap-4">
        {variant?.discount > 0 && (
          <p className="text-[20px] text-primary">
            {formatCurrency(variant?.price * (1 - variant?.discount))}
          </p>
        )}
        <p
          className={`${
            variant?.discount > 0
              ? 'line-through text-[16px]'
              : 'text-primary text-[24px]'
          }`}
        >
          {formatCurrency(variant?.price!)}
        </p>
      </div>
      <div className="flex gap-4">
        {productData?.variants?.map((item) => (
          <Variant
            onChangeVariant={onChangeVariant}
            key={item._id}
            {...item}
            isActive={variantId === item._id}
          />
        ))}
      </div>
      <div className="">
        <span className="">Quantity:</span>
        <QuantityInput
          max={variant?.stock!}
          value={+quantityForm?.watch('quantity')}
          onChange={(value) =>
            quantityForm?.setValue('quantity', value.toString())
          }
        />
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() =>
            handleAddCart({
              product_id: productData._id,
              quantity: +quantityForm?.watch('quantity'),
              variant_id: variant._id,
            })
          }
          className="w-[160px]"
          text="Add to cart"
        >
          <BsCartCheck />
        </Button>
        <Button className="w-[160px]" text="Add to wishlist">
          <IoIosHeartEmpty />
        </Button>
      </div>
      <div className="">Category: {categoryData?.name}</div>
      {Object.keys(productData?.attributes).length > 0 && (
        <Descriptions title="Product Details" bordered column={1}>
          {Object.entries(productData?.attributes).map(([key, value]) => (
            <Descriptions.Item key={key} label={key.toUpperCase()}>
              {typeof value === 'object'
                ? value.map((item) => <p>{item}</p>)
                : value}
            </Descriptions.Item>
          ))}
        </Descriptions>
      )}
    </div>
  );
};

export default DisplayProductInfor;
