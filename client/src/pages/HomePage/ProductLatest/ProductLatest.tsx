import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay } from 'swiper/modules';
import { ProductItem } from '../../../components';
import { TTBrandPropsProps } from './tyings';
import { FC } from 'react';

const ProductLatest: FC<TTBrandPropsProps> = ({ listProduct }) => {
  return (
    <div className="">
      <h2 className="mb-10 ml-5 text-[36px] font-bold text-primary uppercase border-b-[3px] border-primary w-max">
        The newest product
      </h2>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop
        slidesPerView="auto"
        spaceBetween={30}
        modules={[Autoplay]}
        className="h-[460px]"
      >
        {listProduct?.length > 0 &&
          listProduct?.slice(0, 10).map((item) => (
            <SwiperSlide className="max-w-[277px]" key={item._id}>
              <ProductItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default ProductLatest;
