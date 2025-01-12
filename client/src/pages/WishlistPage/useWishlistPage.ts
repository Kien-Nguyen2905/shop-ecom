import { useDispatch } from 'react-redux';
import { AppDispatch, useSelector } from '../../store/store';
import { TAddToCart, TWishList } from './tyings';
import { addToCart } from '../../store/middlewares/cartMiddleware';
import { handleError } from '../../libs';
import { message } from 'antd';
import { updateWishlist } from '../../store/middlewares/wishlistMiddleWare';
import { useState } from 'react';
import { THUNK_STATUS } from '../../constants';

export const useWishlistPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, updateStatus } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = wishlist?.products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddtoCart = async (payload: TAddToCart) => {
    if (payload && updateStatus !== THUNK_STATUS.pending) {
      try {
        const quantityExist =
          cart?.products.find(
            (product) =>
              product.product_id === payload.product_id &&
              product.variant_id === payload.variant_id,
          )?.quantity || 0;
        const res = await dispatch(
          addToCart({ ...payload, quantity: quantityExist + payload.quantity }),
        ).unwrap();
        if (res.data._id) {
          message.success(res.message);
        }
      } catch (error) {
        handleError({
          error,
        });
      }
    }
  };

  const handleRemoveWishList = async ({
    action,
    product_id,
    variant_id,
  }: TWishList) => {
    try {
      await dispatch(
        updateWishlist({
          product_id,
          action,
          variant_id,
        }),
      ).unwrap();
    } catch (error) {
      handleError({ error });
    }
  };

  return {
    wishlist,
    handleAddtoCart,
    handleRemoveWishList,
    currentProducts,
    handlePageChange,
    currentPage,
    ITEMS_PER_PAGE,
  };
};
