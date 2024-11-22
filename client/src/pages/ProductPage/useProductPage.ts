import { useLocation, useSearchParams } from 'react-router-dom';
import { useCategoryQuery, useProductQuery } from '../../queries';
import queryString from 'query-string';
import { debounce } from 'lodash';
import { useState } from 'react';

export const useProductPage = () => {
  const { search } = useLocation();
  const [_, setSearchParams] = useSearchParams();
  const { data: categories } = useCategoryQuery();
  const { data } = useProductQuery(search);

  const products = data?.products || [];
  const queryObject = queryString.parse(search) as Record<
    string,
    string | string[]
  >;
  let updatedQuery: Record<string, string | string[]> = { ...queryObject };

  const onCategoryChange = (field: string, value: string) => {
    if (value === updatedQuery[field]) {
      updatedQuery = { ...updatedQuery, [field]: '' };
    } else {
      updatedQuery = { ...updatedQuery, [field]: value };
    }
    setSearchParams(updatedQuery);
  };
  const onRangePriceChange = debounce((value: number[]) => {
    updatedQuery = {
      ...updatedQuery,
      ['minPrice']: value[0].toString(),
      ['maxPrice']: value[1].toString(),
    };
    setSearchParams(updatedQuery);
  }, 700);

  // Step 1: Define state to track selected checkboxes
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, boolean>
  >({});

  // Step 2: Handle checkbox change
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
      [filter]: filterUpdate[filter].toString(),
    };
    setSearchParams(updatedQuery);
  };

  return {
    products,
    categories,
    onCategoryChange,
    onRangePriceChange,
    selectedFilters,
    handleCheckboxChange,
    setSelectedFilters,
  };
};
