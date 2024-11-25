import { FC } from 'react';
import { TAB } from '../../../constants';
import { TFeaturedProps } from './tyings';
import FeaturedItem from './components/FeaturedItem';

const Featured: FC<TFeaturedProps> = ({ list, selectTab, setSelectTab }) => {
  return (
    <div className="py-10">
      <div className="flex items-center justify-center gap-3 mb-10 feature">
        <span
          className={`relative cursor-pointer nav-link px-2 py-[10px] font-semibold text-2xl ${
            selectTab == TAB.POPULAR ? 'text-primary active' : ''
          }`}
          onClick={() => setSelectTab(TAB.POPULAR)}
        >
          Popular
        </span>
        <span
          className={`relative cursor-pointer nav-link px-2 py-[10px] font-semibold text-2xl ${
            selectTab == TAB.ONSALE ? 'text-primary active' : ''
          }`}
          onClick={() => setSelectTab(TAB.ONSALE)}
        >
          On Sale
        </span>
        <span
          className={`relative cursor-pointer nav-link px-2 py-[10px] font-semibold text-2xl ${
            selectTab == TAB.RATED ? 'text-primary active' : ''
          }`}
          onClick={() => setSelectTab(TAB.RATED)}
        >
          Top Rated
        </span>
      </div>
      <FeaturedItem>{list}</FeaturedItem>
    </div>
  );
};

export default Featured;
