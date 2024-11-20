import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { CAROUSEL } from '../../../constants';
const Banner = () => {
  return (
    <div className="">
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        autoplay={{
          delay: 3000,
        }}
        speed={500}
      >
        {CAROUSEL.map((item) => (
          <SwiperSlide
            key={item}
            className=" w-[197.266px] md:w-[425px] xl:w-[332px] 2xl:w-[466px]"
          >
            <img src={item} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
