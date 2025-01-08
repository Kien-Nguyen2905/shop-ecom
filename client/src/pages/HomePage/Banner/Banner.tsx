import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { CAROUSEL } from '../../../constants';
const Banner = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView="auto"
      autoplay={{
        delay: 3000,
      }}
      speed={500}
    >
      {CAROUSEL.map((item) => (
        <SwiperSlide key={item}>
          <img src={item} alt="banner" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
