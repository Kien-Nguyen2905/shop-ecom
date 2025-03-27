import { FilterProduct, ProductList } from './components';
import { useProductPage } from './useProductPage';
import { CUSTOMER_PATHS, SORT_OPTIONS } from '../../constants';
import { BreadCrumb, Loading } from '../../components';
import Input from '../../components/Input/Input';
import { Pagination, Select } from 'antd';

const ProductPage = () => {
  const {
    productProps,
    isLoadingCate,
    onSortChange,
    sortValue,
    pagiProps,
    filterProductProps,
    onPageChange,
  } = useProductPage();
  if (isLoadingCate) return <Loading />;
  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <BreadCrumb
          items={[
            { name: 'Home', path: CUSTOMER_PATHS.ROOT },
            { name: 'Product', path: CUSTOMER_PATHS.PRODUCT },
          ]}
        />
        <div>
          <Input
            defaultType
            renderProp={() => (
              <div className="flex flex-col w-full">
                <Select
                  style={{
                    padding: 0,
                  }}
                  filterOption={(input, option) =>
                    ((option?.label as string) ?? '').includes(input)
                  }
                  value={sortValue || null}
                  options={SORT_OPTIONS}
                  disabled={!SORT_OPTIONS || SORT_OPTIONS.length === 0}
                  className={`w-full custom-select-product bg-bgInPut border outline-none focus:border-primary`}
                  onChange={(value) => {
                    onSortChange(value);
                  }}
                />
              </div>
            )}
          />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-[30px] xl:flex-row">
        <FilterProduct {...filterProductProps} />
        <div className="flex-1">
          <ProductList {...productProps} />
          <div className="flex justify-center py-[25px] md:py-[30px]">
            <Pagination
              className="panigation-product-page"
              current={pagiProps.current}
              total={pagiProps.total}
              pageSize={pagiProps.pageSize}
              onChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
