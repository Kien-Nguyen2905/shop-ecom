import { FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './DisplayProduct.scss';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import { TDisplayProductProps } from './tyings';

const DisplayProductImage: FC<TDisplayProductProps> = ({ listImage }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <div className="flex flex-col items-center w-full xl:w-[450px] overflow-hidden">
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        slidesPerView={1}
        className="w-full"
      >
        {listImage?.map((item: string) => (
          <SwiperSlide className="w-full h-full cursor-pointer" key={item}>
            <img
              src={item}
              className="object-cover w-full h-full"
              alt="Product"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        freeMode={true}
        slidesPerView={3}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="flex justify-between w-full mt-4 cursor-pointer"
      >
        {listImage?.map((item: string) => (
          <SwiperSlide
            key={item}
            className="xl:!w-[140px] !h-[120px] md:!h-[190px] xl:!h-[120px] cursor-pointer"
          >
            <img
              src={item}
              className="object-cover w-full h-full"
              alt="Thumbnail"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DisplayProductImage;
