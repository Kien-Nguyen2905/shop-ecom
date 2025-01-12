import { formatCurrency } from '../../utils';
import { Pagination } from 'antd';
import { Button } from '../../components';
import { VscClose } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { CUSTOMER_PATHS } from '../../constants';
import { ACTION_WISHLIST } from '../../constants/enum';
import { useWishlistPage } from './useWishlistPage';

const WishlistPage = () => {
  const {
    wishlist,
    handleAddtoCart,
    handleRemoveWishList,
    currentProducts,
    handlePageChange,
    currentPage,
    ITEMS_PER_PAGE,
  } = useWishlistPage();

  return (
    <>
      {wishlist && wishlist?.products?.length > 0 && (
        <div className="pb-5 border-darkGrey font-bold">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-darkGrey">
                <th className="w-[200px] p-2">Product</th>
                <th className="w-[100px] text-center">Price</th>
                <th className="w-[100px] text-center">Discount</th>
                <th className="w-[120px] text-center">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
      )}

      {currentProducts && currentProducts.length > 0 ? (
        <>
          <table className="w-full text-left border-collapse text-[10px] md:text-[14px]">
            <tbody>
              {currentProducts.map((item) => (
                <tr key={item.variant_id} className="border-b border-darkGrey">
                  <td className="w-[200px] p-2">
                    <Link
                      to={
                        CUSTOMER_PATHS.PRODUCT +
                        `/${item.product_id}?variant=${item.variant_id}`
                      }
                      className="flex items-center gap-3 hover:text-primary"
                    >
                      <img
                        className="w-[25px] h-[25px] xl:w-14 xl:h-14"
                        src={item.image}
                        alt={item.name}
                      />
                      <div className="overflow-hidden ">
                        <p className="truncate max-w-[100px] xl:max-w-[180px]">
                          {item.name}
                        </p>
                        <p>{item.color}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="w-[100px] text-center">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="w-[100px] text-center">
                    {item.discount > 0 ? (
                      <strong className="text-red-600">
                        {item.discount * 100}%
                      </strong>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="w-[120px] text-center">
                    <div className="flex justify-center items-center gap-1 md:gap-3 xl:gap-5">
                      <Button
                        onClick={() =>
                          handleAddtoCart({
                            product_id: item.product_id,
                            quantity: 1,
                            variant_id: item.variant_id,
                          })
                        }
                        text="Add to cart"
                        className="py-[5px] px-[8px]"
                      />
                      <VscClose
                        onClick={() =>
                          handleRemoveWishList({
                            product_id: item.product_id,
                            action: ACTION_WISHLIST.REMOVE,
                            variant_id: item.variant_id,
                          })
                        }
                        className="cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            current={currentPage}
            total={wishlist?.products.length || 0}
            pageSize={ITEMS_PER_PAGE}
            onChange={handlePageChange}
            className="ml-auto text-center mt-9 w-max panigation-product-page"
          />
        </>
      ) : (
        <div className="mt-4 mr-auto w-max text-center text-gray-600">
          Wishlist is empty...
        </div>
      )}
    </>
  );
};

export default WishlistPage;
