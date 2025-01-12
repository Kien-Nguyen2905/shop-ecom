import { FC } from 'react';
import { ProductItem, SkeletonCard } from '../../../components';
import { TProductListProps } from './tyings';

const ProductList: FC<TProductListProps> = ({
  isLoadingProduct,
  listProduct,
}) => {
  if (isLoadingProduct)
    return (
      <div className="h-[840px] xl:h-[870px] 2xl:h-[1000px] w-full relative ml-auto">
        <SkeletonCard></SkeletonCard>
      </div>
    );
  return (
    <div className="flex-1">
      {listProduct?.length > 0 ? (
        <>
          <div className="w-full xl:h-[870px] 2xl:h-[1000px] relative ml-auto">
            <div className="grid w-full h-full grid-cols-2 gap-[15px] lg:grid-cols-3 md:gap-[30px] ml-auto">
              {listProduct.map((product) => (
                <div key={product._id} className="w-full h-full">
                  <ProductItem
                    className="max-w-[275px] md:max-w-[355px]"
                    product={product}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="mr-auto flex-1 w-max h-[790px]">
          <p className="text-[16px] text-gray-600">Not found product ...</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
