import { FC } from 'react';
import { ProductItem } from '../../../components';
import { TProductListProps } from './tyings';
import { Pagination } from 'antd';

const ProductList: FC<TProductListProps> = ({ listProduct, onPageChange }) => {
  if (!listProduct) return null; // Ensure we handle the null/undefined case

  const { products, pagination } = listProduct;

  return (
    <div className="flex-1">
      {products.length > 0 ? (
        <>
          <div className="h-[911px] w-max relative">
            <div className="grid w-full h-full grid-cols-3 gap-[30px] ml-auto">
              {products.map((item) => (
                <div
                  key={item._id}
                  className="col-6 h-max col-md-4 col-lg-4 w-max"
                >
                  <ProductItem item={item} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center pb-[30px]">
            <Pagination
              current={pagination.currentPage}
              total={pagination.totalProducts}
              pageSize={pagination.limit}
              onChange={onPageChange}
            />
          </div>
        </>
      ) : (
        <div className="mr-auto flex-1 w-max h-[910px]">
          <p className="text-[16px] text-gray-600 ">Not found product ...</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
