import { FC } from 'react';
import { TFeaturedProps } from './tyings';
import FeaturedItem from './components/FeaturedItem';
import { TABS } from '../../../constants';

const Featured: FC<TFeaturedProps> = ({
  productList,
  selectTab,
  setSelectTab,
}) => {
  return (
    <div className="py-10">
      <div className="flex items-center justify-center gap-3 mb-10 feature">
        {TABS.map((tab) => (
          <span
            key={tab.value}
            className={`text-[16px] relative cursor-pointer nav-link px-2 py-[10px] font-semibold md:text-2xl
              ${selectTab === tab.value ? 'text-primary active' : ''} `}
            onClick={() => setSelectTab(tab.value)}
          >
            {tab.label}
          </span>
        ))}
      </div>
      <FeaturedItem productList={productList} />
    </div>
  );
};

export default Featured;
