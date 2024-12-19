import { useLocation, useSearchParams } from 'react-router-dom';
import { useCategoryQuery, useProductQuery } from '../../queries';
import queryString from 'query-string';
import { debounce } from 'lodash';
import { useState, useEffect } from 'react';
import { SORT_OPTIONS } from '../../constants';

const LIMITS = 6;

export const useProductPage = () => {
  const { search } = useLocation();
  const [_, setSearchParams] = useSearchParams();
  const { data: categories } = useCategoryQuery();
  const { data } = useProductQuery(search || `?limit=${LIMITS}&page=1`);
  // Parse the query params from the URL
  const queryObject = queryString.parse(search) as Record<
    string,
    string | string[]
  >;

  const [sortValue, setSortValue] = useState<string>(
    queryObject.orderBy
      ? SORT_OPTIONS.find(
          (option) =>
            option.sortField === queryObject.orderBy &&
            option.sortOrder.toString() === queryObject.order,
        )?.value || 'newest'
      : 'newest',
  );

  let updatedQuery: Record<string, string | string[]> = { ...queryObject };

  const [currentPage, setCurrentPage] = useState<number>(
    Number(queryObject.page) || 1,
  );

  const products = data;

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

  const onRangePriceChange = debounce((value: number[]) => {
    updatedQuery = {
      ...updatedQuery,
      limit: LIMITS.toString(),
      page: '1',
      ['minPrice']: value[0].toString(),
      ['maxPrice']: value[1].toString(),
    };
    setSearchParams(updatedQuery);
  }, 700);

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, boolean>
  >({});

  const handleCheckboxChange = (filter: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter], // Toggle the value (true/false)
    }));
    const filterUpdate = {
      ...selectedFilters,
      [filter]: !selectedFilters[filter], // Toggle the value (true/false)
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

  useEffect(() => {
    // Sync sortValue with URL params when the component mounts
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

  return {
    sortValue,
    setSortValue,
    onPageChange,
    products,
    categories,
    onCategoryChange,
    onRangePriceChange,
    selectedFilters,
    handleCheckboxChange,
    setSelectedFilters,
    onSortChange,
  };
};
