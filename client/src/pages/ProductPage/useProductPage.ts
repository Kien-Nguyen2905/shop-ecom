import { useLocation, useSearchParams } from 'react-router-dom';
import { useCategoryQuery, useProductQuery } from '../../queries';
import queryString from 'query-string';
import { debounce } from 'lodash';
import { useState, useEffect, useMemo } from 'react';
import { SORT_OPTIONS } from '../../constants';
import useBreakpoint from '../../hooks/useBreakPoint';

export const useProductPage = () => {
  const LIMITS = 6;
  const isXlScreen = useBreakpoint('xl');
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories, isLoading: isLoadingCate } = useCategoryQuery();
  const { data: productData, isLoading: isLoadingProduct } = useProductQuery(
    search || `?limit=${LIMITS}&page=1`,
  );
  const urlParams = new URLSearchParams(search);
  // Parse the query params from the URL
  const queryObject = queryString.parse(search) as Record<
    string,
    string | string[]
  >;
  let updatedQuery: Record<string, string | string[]> = { ...queryObject };
  const [sortValue, setSortValue] = useState<string>(
    queryObject.orderBy
      ? SORT_OPTIONS.find(
          (option) =>
            option.sortField === queryObject.orderBy &&
            option.sortOrder.toString() === queryObject.order,
        )?.value || 'newest'
      : 'newest',
  );
  const [priceRange, setPriceRange] = useState<number[]>([0, 0]);
  const [isChecked, setIsChecked] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, boolean>
  >({});
  const [currentPage, setCurrentPage] = useState<number>(
    Number(queryObject.page) || 1,
  );
  const [cachedTotalProducts, setCachedTotalProducts] = useState<number>(
    productData?.pagination?.totalProducts || 0,
  );

  const productProps = {
    isLoadingProduct,
    listProduct: productData?.products || [],
  };
  const pagiProps = {
    current: productData?.pagination?.currentPage,
    total: cachedTotalProducts || 0,
    pageSize: 6,
  };

  const onCategoryChange = (field: string, value: string) => {
    if (value === updatedQuery[field]) {
      updatedQuery = {
        ...updatedQuery,
        limit: LIMITS.toString(),
        page: currentPage.toString(),
        [field]: '',
      };
    } else {
      updatedQuery = {
        ...updatedQuery,
        limit: LIMITS.toString(),
        page: '1',
        [field]: value,
      };
    }
    setSearchParams(updatedQuery);
  };

  const onSortChange = (value: string) => {
    setSortValue(value);
    const selectedOption = SORT_OPTIONS.find(
      (option) => option.value === value,
    );
    if (selectedOption) {
      updatedQuery = {
        ...updatedQuery,
        limit: LIMITS.toString(),
        page: '1',
        orderBy: selectedOption.sortField,
        order: selectedOption.sortOrder.toString(),
      };
      setSearchParams(updatedQuery);
    }
  };

  const onRangePriceChange = useMemo(
    () =>
      debounce((value: number[]) => {
        updatedQuery = {
          ...updatedQuery,
          limit: LIMITS.toString(),
          page: '1',
          ['minPrice']: value[0].toString(),
          ['maxPrice']: value[1].toString(),
        };
        setSearchParams(updatedQuery);
      }, 700),
    [searchParams],
  );

  const handlePriceChange = (value: number[]) => {
    onRangePriceChange(value);
    setPriceRange(value);
  };

  const handleCleanAll = () => {
    setSortValue('newest');
    setPriceRange([0, 0]);
    setIsChecked('');
    setSearchParams({});
    setSelectedFilters({});
  };

  const handleCheckboxChange = (filter: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
    const filterUpdate = {
      ...selectedFilters,
      [filter]: !selectedFilters[filter],
    };
    updatedQuery = {
      ...updatedQuery,
      limit: LIMITS.toString(),
      page: '1',
      [filter]: filterUpdate[filter].toString(),
    };
    setSearchParams(updatedQuery);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    const newQuery = {
      ...updatedQuery,
      limit: LIMITS.toString(),
      page: page.toString(),
    };
    setSearchParams(newQuery);
  };

  const getQueryParams = () => {
    const minPrice = urlParams.get('minPrice');
    const maxPrice = urlParams.get('maxPrice');
    const categoryId = urlParams.get('category');

    if (minPrice && maxPrice) {
      setPriceRange([parseInt(minPrice, 10), parseInt(maxPrice, 10)]);
    }
    if (categoryId) {
      setIsChecked(categoryId);
    }
  };

  useEffect(() => {
    const newTotal = productData?.pagination?.totalProducts;

    if (newTotal !== undefined && newTotal !== cachedTotalProducts) {
      setCachedTotalProducts(newTotal);
    }
  }, [productData?.pagination?.totalProducts, cachedTotalProducts]);

  useEffect(() => {
    getQueryParams();
    if (queryObject.orderBy && queryObject.order) {
      const matchedOption = SORT_OPTIONS.find(
        (option) =>
          option.sortField === queryObject.orderBy &&
          option.sortOrder.toString() === queryObject.order,
      );
      if (matchedOption) {
        setSortValue(matchedOption.value);
      }
    }
  }, [search]);

  const filterProductProps = {
    categories: categories || [],
    onCategoryChange,
    handlePriceChange,
    selectedFilters,
    handleCheckboxChange,
    setIsChecked,
    isChecked,
    priceRange,
    isXlScreen,
    onSale: urlParams.get('onSale') || '',
    popular: urlParams.get('popular') || '',
    topRated: urlParams.get('topRated') || '',
    handleCleanAll,
  };
  return {
    sortValue,
    onPageChange,
    productProps,
    categories,
    isLoadingCate,
    onSortChange,
    pagiProps,
    filterProductProps,
  };
};
