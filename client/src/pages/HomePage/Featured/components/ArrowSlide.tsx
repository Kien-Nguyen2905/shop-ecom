import { FC } from 'react';
import { TArrowSlideProps } from './tyings';

const ArrowSlide: FC<TArrowSlideProps> = ({
  children,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`${className} text-primary cursor-pointer`}
    >
      {children}
    </div>
  );
};

export default ArrowSlide;
