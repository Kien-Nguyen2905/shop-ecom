import {
  CarouselImg1,
  CarouselImg2,
  CarouselImg3,
  CarouselImg4,
  CarouselImg5,
} from '../assets/images/home';

export const CAROUSEL = [
  CarouselImg1,
  CarouselImg2,
  CarouselImg3,
  CarouselImg4,
  CarouselImg5,
];
export const VALUE_TABS = {
  POPULAR: 'isPopular',
  ONSALE: 'isRated',
  RATED: 'onSale',
};
export const TABS = [
  { label: 'Popular', value: VALUE_TABS.POPULAR },
  { label: 'On Sale', value: VALUE_TABS.ONSALE },
  { label: 'Top Rated', value: VALUE_TABS.RATED },
];
export const MODAL_TABS = {
  SIGN_IN: 'signIn',
  SIGN_UP: 'signUp',
};
