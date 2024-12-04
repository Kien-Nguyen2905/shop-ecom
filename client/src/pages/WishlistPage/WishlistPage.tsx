import { AppDispatch, useSelector } from '../../store/store';
import { formatCurrency } from '../../utils';
import { Typography, Pagination } from 'antd'; // Import Pagination
import { Button } from '../../components';
import { VscClose } from 'react-icons/vsc';
import { addToCart } from '../../store/middlewares/cartMiddleware';
import { useDispatch } from 'react-redux';
import { updateWishlist } from '../../store/middlewares/wishlistMiddleWare';
import { Link } from 'react-router-dom';
import { CUSTOMER_PATHS } from '../../constants';
import { useProductQuery } from '../../queries';
import { useState } from 'react';

const { Text } = Typography;

const WishlistPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { data: productData } = useProductQuery();

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Define items per page

  if (!wishlist) return <div className="">Empty</div>;

  // Calculate the paginated items
  const totalItems = wishlist?.list_item?.length || 0;
  const paginatedItems = wishlist?.list_item?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {wishlist?.list_item?.length > 0 && (
        <div className="flex items-center justify-start gap-[60px] pb-5 border-b border-darkGrey font-bold">
          <div className="w-[200px] flex items-center gap-3">
            <p className="flex-1">Product</p>
          </div>
          <p className="w-[100px] text-center">Price</p>
          <div className="w-[100px] text-center">Discount</div>
          <div className="w-[120px] text-center">Actions</div>
        </div>
      )}

      {/* Wishlist items */}
      {paginatedItems?.length > 0 ? (
        paginatedItems.map((item) => (
          <div
            key={item.product_id}
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
                  <p>
                    {
                      productData?.products
                        .find((product) => product._id === item.product_id)
                        ?.variants.find(
                          (variant) => variant._id === item.variant_id,
                        )?.color
                    }
                  </p>
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
                    dispatch(
                      addToCart({
                        product_id: item.product_id,
                        quantity: 1,
                        variant_id: item.variant_id,
                      }),
                    )
                  }
                  text="Add to cart"
                ></Button>
                <VscClose
                  onClick={() =>
                    dispatch(
                      updateWishlist({
                        product_id: item.product_id,
                        quantity: -1,
                        variant_id: item.variant_id,
                      }),
                    )
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

      {/* Pagination */}
      {totalItems > itemsPerPage && (
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={totalItems}
          onChange={handlePageChange}
          className="mt-4 text-center"
        />
      )}
    </div>
  );
};

export default WishlistPage;
