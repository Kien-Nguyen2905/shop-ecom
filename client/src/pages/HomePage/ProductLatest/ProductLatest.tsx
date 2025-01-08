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
    <div className="pb-[10px] md:pb-[50px]">
      <h2 className="mb-10 ml-5 md:text-[24px] font-bold uppercase text-primary border-b-[1.5px] border-primary w-max">
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
        className="h-[460px] md:h-[400px]"
      >
        {listProduct?.length > 0 &&
          listProduct?.slice(0, 10).map((product) => (
            <SwiperSlide className="max-w-[257px]" key={product._id}>
              <ProductItem product={product} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default ProductLatest;
