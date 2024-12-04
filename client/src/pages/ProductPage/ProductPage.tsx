import { Link, NavLink } from 'react-router-dom';
import { FilterProduct, ProductList } from './components';
import { useProductPage } from './useProductPage';
import { CUSTOMER_PATHS, SORT_OPTIONS } from '../../constants';
import { Select } from 'antd';

const ProductPage = () => {
  const {
    products,
    categories,
    onCategoryChange,
    onRangePriceChange,
    handleCheckboxChange,
    selectedFilters,
    setSelectedFilters,
    onPageChange,
    onSortChange,
    sortValue,
    setSortValue,
  } = useProductPage();
  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 py-10">
          <Link to={CUSTOMER_PATHS.ROOT}>Home</Link>
          <span> {'>'}</span>
          <NavLink
            to={CUSTOMER_PATHS.PRODUCT}
            className={({ isActive }) => `${isActive ? 'text-primary' : ''}`}
          >
            Product
          </NavLink>
        </div>
        <div>
          <Select
            value={sortValue}
            className="w-[200px]"
            onChange={onSortChange}
          >
            {SORT_OPTIONS.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex justify-between gap-[30px]">
        <FilterProduct
          setSortValue={setSortValue}
          setSelectedFilters={setSelectedFilters}
          selectedFilters={selectedFilters}
          handleCheckboxChange={handleCheckboxChange}
          onRangePriceChange={onRangePriceChange}
          onCategoryChange={onCategoryChange}
          categories={categories!}
        />

        <ProductList onPageChange={onPageChange} listProduct={products!} />
      </div>
    </div>
  );
};

export default ProductPage;
