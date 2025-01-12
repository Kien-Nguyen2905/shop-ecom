import { FC, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductItem } from '../../../../components';
import { TFeaturedItemProps } from './tyings';
import { Keyboard, Navigation, Pagination } from 'swiper/modules';

import './FeaturedItem.scss';
import ArrowSlide from './ArrowSlide';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

const FeaturedItem: FC<TFeaturedItemProps> = ({
  productList,
  className = '',
}) => {
  const swiperRef = useRef<any>(null);

  return (
    <div className={`${className} relative px-[50px] md:px-[30px]`}>
      <ArrowSlide
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-[20px] z-10 -translate-x-1/2 top-[30%] md:left-[10px] w-[30px] md:w-max"
      >
        <SlArrowLeft size={50} />
      </ArrowSlide>

      <ArrowSlide
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-[-5px] md:right-[-43px] z-10 -translate-x-1/2 top-[30%] w-[30px] md:w-max"
      >
        <SlArrowRight size={50} />
      </ArrowSlide>

      {productList?.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination, Keyboard]}
          pagination={{ clickable: true }}
          loop
          breakpoints={{
            0: {
              slidesPerView: 'auto',
            },
            768: {
              spaceBetween: 10,
              slidesPerView: 3,
            },
            1280: {
              spaceBetween: 15,
              slidesPerView: 4,
            },
            1536: {
              spaceBetween: 15,
              slidesPerView: 5,
            },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="featured-carousel"
        >
          {productList.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductItem
                className="w-[257px] md:w-[280px]"
                product={product}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default FeaturedItem;
