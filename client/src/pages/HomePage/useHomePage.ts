import { useMemo, useState } from 'react';
import { VALUE_TABS } from '../../constants';
import { useProductQuery } from '../../queries';
import { TProductItem } from '../../services/Product/tyings';

export const useHomePage = () => {
  const { data, isLoading } = useProductQuery();
  const products = data?.products || [];
  const [selectTab, setSelectTab] = useState<string>(VALUE_TABS.POPULAR);
  // using useMemo handle out list matching for tab and return selectTab
  const hotProduct = useMemo(() => {
    let productList: TProductItem[] = [];
    switch (selectTab) {
      case VALUE_TABS.POPULAR:
        productList = products?.filter((item) => item.featured.isPopular) || [];
        break;
      case VALUE_TABS.ONSALE:
        productList = products?.filter((item) => item.featured.onSale) || [];
        break;
      case VALUE_TABS.RATED:
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
  return { hotProduct, products, isLoading };
};
