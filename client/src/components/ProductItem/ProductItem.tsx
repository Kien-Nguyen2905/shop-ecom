import { Rate } from 'antd';
import { FC } from 'react';
import { BsCartCheck } from 'react-icons/bs';
import { IoIosHeartEmpty } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { TProductItemProps } from './tyings';

const ProductItem: FC<TProductItemProps> = ({ className = '', item }) => {
  return (
    <div className={`max-w-[277px] border-[0.5px] relative group ${className}`}>
      <div className="">
        <div className="relative overflow-hidden h-0 pb-[100%] ">
          <img
            className="absolute object-cover w-full h-full transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 hover:scale-110"
            src={item?.thumbnail}
            alt=""
          />
        </div>
        <button className="absolute flex items-center justify-center w-8 h-8 gap-4 text-white transition-all transform translate-y-full rounded-full opacity-0 pointer-events-none btn-expandable group/item top-6 right-2 bg-primary group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto ">
          <span className="text-[10px]">Add to wishlist</span>
          <IoIosHeartEmpty size={15} className="w-full" />
        </button>
        {item.variants[0].discount > 0 && (
          <>
            <span className="absolute w-12 h-12 text-[13px] font-PpLight flex items-center justify-center text-white rounded-full top-6 left-2 bg-[#ef837b]">
              Sale
            </span>
          </>
        )}
        <button className="absolute flex items-center justify-center w-full gap-4 text-white transition-all transform translate-y-full opacity-0 pointer-events-none h-9 bg-backFont group-hover:-translate-y-9 group-hover:opacity-100 group-hover:pointer-events-auto">
          <BsCartCheck />
          Add To Cart
        </button>
        <div className="relative flex flex-col w-full gap-2 px-5 py-5 bg-white z-100">
          <Link
            to={'/'}
            className="text-[16px] font-PpMd font-bold text-backFont"
          >
            {item?.name}
          </Link>
          <div className="flex gap-2">
            <div
              className={`text-primary text-[16px] ${
                item.variants[0].discount > 0 ? 'line-through' : ''
              }`}
            >
              {item.variants[0].price}
            </div>
            {item.variants[0].discount > 0 && (
              <div className="text-primary text-[16px]">
                {(1 - item.variants[0].discount) * item.variants[0].price}
              </div>
            )}
          </div>
          <div className="">
            <Rate disabled value={item.rate} />
            {/* <span className="ratings-text">( 4 Reviews )</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
