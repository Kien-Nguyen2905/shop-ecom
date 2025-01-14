import { Modal, Descriptions, Rate } from 'antd';
import Variant from './Variant';
import { BsCartCheck } from 'react-icons/bs';
import { IoIosHeartEmpty } from 'react-icons/io';
import { Button, QuantityInput } from '../../../components';
import { FC } from 'react';
import { TDisplayProductInforProps } from './tyings';
import { formatCurrency } from '../../../utils';
import { ACTION_WISHLIST } from '../../../constants/enum';

const DisplayProductInfor: FC<TDisplayProductInforProps> = ({
  productData,
  onChangeVariant,
  variantId,
  quantityForm,
  categoryData,
  handleAddCart,
  warehouseData,
  onAddWishlist,
  brandData,
  handleToggleShowMore,
  isModalOpen,
}) => {
  const variant = productData?.variants?.find((item) => item._id === variantId);
  if (!variant) return;
  return (
    <div className="flex flex-col flex-1 gap-4">
      <h3 className="font-bold text-[24px]">{productData?.name}</h3>
      <Rate disabled value={productData?.rate} />
      <div className="flex flex-col gap-4 md:flex-row xl:flex-col md:items-start md:justify-between">
        <div className="">
          <div className="flex items-center gap-4 pb-[16px]">
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
          <div className="flex gap-4 w-full flex-wrap">
            {productData?.variants?.map((item) => (
              <Variant
                onChangeVariant={onChangeVariant}
                key={item._id}
                {...item}
                isActive={variantId === item._id}
              />
            ))}
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-5 pb-[16px]">
            <span>Quantity</span>
            <QuantityInput
              max={variant?.stock!}
              value={+quantityForm?.watch('quantity')}
              onChange={(value) =>
                quantityForm?.setValue('quantity', value.toString())
              }
            />
            <div>
              <span>{variant?.stock}</span> items available
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              disabled={warehouseData?.[0].stock <= 0}
              onClick={() => {
                if (warehouseData?.[0].stock > 0) {
                  handleAddCart({
                    product_id: productData._id,
                    quantity: +quantityForm?.watch('quantity'),
                    variant_id: variant._id,
                  });
                }
              }}
              className="w-[160px]"
              text={`${
                warehouseData?.[0].stock <= 0 ? 'Out of stock' : 'Add to cart'
              }`}
            >
              <BsCartCheck />
            </Button>
            <Button
              onClick={() =>
                onAddWishlist({
                  product_id: productData?._id!,
                  action: ACTION_WISHLIST.ADD,
                  variant_id: variant?._id,
                })
              }
              className="w-[160px]"
              text="Add to wishlist"
            >
              <IoIosHeartEmpty />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <p>
          Category: <span className="text-black">{categoryData?.name}</span>
        </p>
        <p>
          Brand:{' '}
          <span className="text-black">
            {brandData?.find((item) => item._id === productData.brand_id)?.name}
          </span>
        </p>
      </div>
      {Object.keys(productData?.attributes).length > 0 && (
        <div className="relative">
          <Descriptions
            title="Product Details"
            bordered
            column={1}
            className="overflow-hidden"
            style={{
              maxHeight: '250px',
              overflow: 'hidden',
            }}
          >
            {Object.entries(productData?.attributes)?.map(([key, value]) => (
              <Descriptions.Item key={key} label={key.toUpperCase()}>
                {Array.isArray(value)
                  ? value.map((item, index) => <p key={index}>{item}</p>)
                  : value}
              </Descriptions.Item>
            ))}
          </Descriptions>
          <div className="flex justify-end mt-2">
            <Button text="Show More" onClick={handleToggleShowMore} />
          </div>
        </div>
      )}
      <Modal open={isModalOpen} footer={null} onCancel={handleToggleShowMore}>
        <Descriptions title="Information" bordered column={1}>
          {Object.entries(productData?.attributes)?.map(([key, value]) => (
            <Descriptions.Item key={key} label={key.toUpperCase()}>
              {Array.isArray(value)
                ? value.map((item, index) => <p key={index}>{item}</p>)
                : value}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Modal>
    </div>
  );
};

export default DisplayProductInfor;
