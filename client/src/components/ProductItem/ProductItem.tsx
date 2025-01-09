import { Rate } from 'antd';
import { FC } from 'react';
import { IoIosHeartEmpty } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { TProductItemProps } from './tyings';
import { CUSTOMER_PATHS } from '../../constants';
import { useProductItem } from './useProductItem';
import { formatCurrency } from '../../utils';
import { updateWishlist } from '../../store/middlewares/wishlistMiddleWare';
import { ACTION_WISHLIST } from '../../constants/enum';
import './ProductItem.scss';
const ProductItem: FC<TProductItemProps> = ({ className = '', product }) => {
  const { onAddWishlist, wishlist, dispatch, profile } = useProductItem();
  if (!product) return;
  return (
    <div
      className={`max-w-[257px] h-max border-[1px] shadow-sm xl:border-[0.5px] relative group ${className}`}
    >
      <Link
        to={
          CUSTOMER_PATHS.PRODUCT +
          `/${product._id}?variant=${product.variants[0]?._id}`
        }
        className="relative overflow-hidden h-0 block cursor-pointer pb-[90%] md:pb-[100%] "
      >
        <img
          className="absolute object-cover w-full h-full transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 hover:scale-110"
          src={product?.thumbnail}
          alt="product image"
        />
      </Link>
      {profile &&
      wishlist?.products?.some(
        (wishlist) => wishlist.product_id === product._id,
      ) ? (
        <div
          onClick={() => {
            dispatch(
              updateWishlist({
                product_id: product?._id!,
                action: ACTION_WISHLIST.REMOVE,
                variant_id: product.variants[0]._id,
              }),
            );
          }}
          className="absolute hidden xl:flex items-center justify-center w-8 h-8 gap-4 text-white transition-all transform translate-y-full bg-red-700 rounded-full opacity-0 cursor-pointer pointer-events-none group/item top-6 right-2 group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto"
        >
          <IoIosHeartEmpty size={15} className="w-full" />
        </div>
      ) : (
        <button
          onClick={() =>
            onAddWishlist({
              product_id: product?._id!,
              action: ACTION_WISHLIST.ADD,
              variant_id: product.variants[0]?._id,
            })
          }
          className="absolute hidden xl:flex items-center justify-center w-8 h-8 gap-4 text-white transition-all transform translate-y-full rounded-full opacity-0 pointer-events-none btn-expandable group/item top-6 right-2 bg-primary group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto "
        >
          <span className="text-[10px]">Add to wishlist</span>
          <IoIosHeartEmpty size={15} className="w-full" />
        </button>
      )}

      {product.variants[0].discount > 0 && (
        <span className="absolute w-10 h-10 text-[12px] md:w-12 md:h-12 md:text-[14px] font-PpLight flex items-center justify-center text-white rounded-full top-6 left-2 bg-[#ef837b]">
          Sale
        </span>
      )}
      <div className="relative flex flex-col w-full gap-2 px-3 py-2 bg-white md:px-5 md:py-4 z-100">
        <Link
          to={
            CUSTOMER_PATHS.PRODUCT +
            `/${product._id}?variant=${product.variants[0]?._id}`
          }
          className="md:text-[16px] font-PpMd hover:text-primary transition-all font-bold text-backPrimary truncate"
        >
          {product?.name}
        </Link>
        <div className="flex items-center justify-between">
          <div className="text-primary text-[14px] md:text-[16px]">
            {formatCurrency(
              (1 - product.variants[0].discount) * product.variants[0].price,
            )}
          </div>
          {product.variants[0].discount > 0 && (
            <div className="text-primary text-[14px] bg-yellow-100 px-1">
              -{product.variants[0].discount * 100} %
            </div>
          )}
        </div>
        <div>
          <Rate disabled value={product.rate} className="rate-product-item" />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
