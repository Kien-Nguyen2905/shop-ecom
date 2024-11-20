import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductItem } from '../../../../components';
import { TFeaturedItemProps } from './tyings';
import { Navigation, Pagination } from 'swiper/modules';

const FeaturedItem: FC<TFeaturedItemProps> = ({ children, className = '' }) => {
  const slidesPerView = 4;
  return (
    <div className={`flex flex-col ${className}`}>
      {children?.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={slidesPerView}
          className="h-[460px]"
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
