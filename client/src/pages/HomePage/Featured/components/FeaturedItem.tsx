import { FC, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductItem } from '../../../../components';
import { TFeaturedItemProps } from './tyings';
import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';

import './FeaturedItem.css';
import ArrowSlide from './ArrowSlide';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

const FeaturedItem: FC<TFeaturedItemProps> = ({ children, className = '' }) => {
  const slidesPerView = 4;

  const swiperRef = useRef<any>(null);

  return (
    <div className={`${className} relative px-10`}>
      <ArrowSlide
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-0 z-10 -translate-x-1/2 top-1/2 w-max"
      >
        <SlArrowLeft size={50} />
      </ArrowSlide>

      <ArrowSlide
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-[-50px] z-10 -translate-x-1/2 top-1/2 w-max"
      >
        <SlArrowRight size={50} />
      </ArrowSlide>

      {children?.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination, Keyboard]}
          pagination={{ clickable: true }}
          loop
          spaceBetween={20}
          slidesPerView={slidesPerView}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="h-[440px]"
        >
          {children.map((item) => (
            <SwiperSlide key={item.id} className="!min-w-[277px]">
              <ProductItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default FeaturedItem;
