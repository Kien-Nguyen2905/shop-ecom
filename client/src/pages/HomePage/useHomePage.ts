import { useMemo, useState } from 'react';
import { TAB } from '../../constants';
import { useProductQuery } from '../../queries';

export const useHomePage = () => {
  const { data } = useProductQuery();
  const products = data?.products;
  const [selectTab, setSelectTab] = useState<String>(TAB.POPULAR);
  // using useMemo handle out list matching for tab and return selectTab
  const hotProduct = useMemo(() => {
    let list: any[] = [];
    switch (selectTab) {
      case TAB.POPULAR:
        list = products?.filter((item) => item.featured.isPopular) || [];
        break;
      case TAB.ONSALE:
        list = products?.filter((item) => item.featured.onSale) || [];
        break;
      case TAB.RATED:
        list = products?.filter((item) => item.featured.isRated) || [];
        break;
      default:
        list;
        break;
    }
    return {
      list,
      selectTab,
      setSelectTab,
    };
  }, [selectTab, products]);
  return { hotProduct, products };
};
