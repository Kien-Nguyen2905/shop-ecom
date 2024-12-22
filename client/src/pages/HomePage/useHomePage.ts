import { useMemo, useState } from 'react';
import { TAB } from '../../constants';
import { useProductQuery } from '../../queries';
import { TProductItem } from '../../services/Product/tyings';

export const useHomePage = () => {
  const { data } = useProductQuery();
  const products = data?.products;
  const [selectTab, setSelectTab] = useState<String>(TAB.POPULAR);
  // using useMemo handle out list matching for tab and return selectTab
  const hotProduct = useMemo(() => {
    let productList: TProductItem[] = [];
    switch (selectTab) {
      case TAB.POPULAR:
        productList = products?.filter((item) => item.featured.isPopular) || [];
        break;
      case TAB.ONSALE:
        productList = products?.filter((item) => item.featured.onSale) || [];
        break;
      case TAB.RATED:
        productList = products?.filter((item) => item.featured.isRated) || [];
        break;
      default:
        productList;
        break;
    }
    return {
      productList,
      selectTab,
      setSelectTab,
    };
  }, [selectTab, products]);
  return { hotProduct, products };
};
