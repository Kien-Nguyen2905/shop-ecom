import { FilterProduct, ProductList } from './components';
import { useProductPage } from './useProductPage';

const ProductPage = () => {
  const {
    products,
    categories,
    onCategoryChange,
    onRangePriceChange,
    handleCheckboxChange,
    selectedFilters,
    setSelectedFilters,
  } = useProductPage();
  return (
    <div className="container">
      <div className=" pt-20 flex justify-between gap-[70px]">
        <FilterProduct
          setSelectedFilters={setSelectedFilters}
          selectedFilters={selectedFilters}
          handleCheckboxChange={handleCheckboxChange}
          onRangePriceChange={onRangePriceChange}
          onCategoryChange={onCategoryChange}
          categories={categories!}
        />
        <ProductList listProduct={products!} />
      </div>
    </div>
  );
};

export default ProductPage;
