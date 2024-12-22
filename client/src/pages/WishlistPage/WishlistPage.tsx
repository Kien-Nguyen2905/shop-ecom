import { formatCurrency } from '../../utils';
import { Typography, Pagination } from 'antd';
import { Button } from '../../components';
import { VscClose } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { CUSTOMER_PATHS } from '../../constants';
import { ACTION_WISHLIST } from '../../constants/enum';
import { useWishlistPage } from './useWishlistPage';

const { Text } = Typography;

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
    <div>
      {wishlist && wishlist?.products?.length > 0 && (
        <div className="flex items-center justify-start gap-[60px] pb-5 border-b border-darkGrey font-bold">
          <div className="w-[200px] flex items-center gap-3">
            <p className="flex-1">Product</p>
          </div>
          <p className="w-[100px] text-center">Price</p>
          <div className="w-[100px] text-center">Discount</div>
          <div className="w-[120px] text-center">Actions</div>
        </div>
      )}

      {currentProducts && currentProducts.length > 0 ? (
        currentProducts.map((item) => (
          <div
            key={item.variant_id}
            className="flex flex-col gap-5 pb-3 border-b pt-9 border-darkGrey"
          >
            <div className="flex items-center justify-start gap-[60px]">
              <Link
                to={
                  CUSTOMER_PATHS.PRODUCT +
                  `/${item.product_id}?variant=${item.variant_id}`
                }
                className="w-[200px] flex items-center gap-3 hover:text-primary"
              >
                <img className="w-14 h-14" src={item.image} alt={item.name} />
                <div className="flex-1">
                  <p>{item.name}</p>
                  <p>{item.color}</p>
                </div>
              </Link>
              <p className="w-[100px] text-center">
                {formatCurrency(item.price)}
              </p>
              {item.discount > 0 ? (
                <Text className="w-[100px] text-center" type="danger">
                  <strong>{item.discount * 100}%</strong>
                </Text>
              ) : (
                <div className="w-[100px]"></div>
              )}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() =>
                    handleAddtoCart({
                      product_id: item.product_id,
                      quantity: 1,
                      variant_id: item.variant_id,
                    })
                  }
                  text="Add to cart"
                ></Button>
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
            </div>
          </div>
        ))
      ) : (
        <div className="mt-4 text-center text-gray-600">Wishlist is empty.</div>
      )}
      <Pagination
        current={currentPage}
        total={wishlist?.products.length || 0}
        pageSize={ITEMS_PER_PAGE}
        onChange={handlePageChange}
        className="ml-auto text-center mt-9 w-max"
      />
    </div>
  );
};

export default WishlistPage;
