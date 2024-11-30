import { AppDispatch, useSelector } from '../../store/store';
import { formatCurrency } from '../../utils';
import { Typography } from 'antd';
import { Button } from '../../components';
import { VscClose } from 'react-icons/vsc';
import { addToCart } from '../../store/middlewares/cartMiddleware';
import { useDispatch } from 'react-redux';
import { updateWishlist } from '../../store/middlewares/wishlistMiddleWare';
const { Text } = Typography;
const WishlistPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { wishlist } = useSelector((state) => state.wishlist);
  if (!wishlist) return <div className="">Empty</div>;
  return (
    <div>
      {wishlist?.list_item?.length > 0 &&
        wishlist.list_item?.map((item) => (
          <div
            key={item.product_id}
            className="flex flex-col gap-5 pb-3 border-b border-darkGrey"
          >
            <div className="flex items-center justify-start gap-[60px]">
              <div className="w-[200px] flex items-center gap-3">
                <img className="w-14 h-14" src={item.image} alt="" />
                <p className=""> {item.name}</p>
              </div>
              <p className="w-[100px] text-center">
                {formatCurrency(item.price)}
              </p>
              <Text className="w-[96px]" type="danger">
                Discount: <strong>{item.discount * 100}%</strong>
              </Text>
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
        ))}
    </div>
  );
};

export default WishlistPage;
