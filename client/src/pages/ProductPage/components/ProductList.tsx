import { FC } from 'react';
import { ProductItem } from '../../../components';
import { TProductListProps } from './tyings';

const ProductList: FC<TProductListProps> = ({ listProduct }) => {
  return (
    <div className="mb-3">
      <div className="grid grid-cols-3 gap-10 ml-auto w-max">
        {listProduct?.map((item) => {
          return (
            <div key={item._id} className="col-6 col-md-4 col-lg-4">
              <ProductItem item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
