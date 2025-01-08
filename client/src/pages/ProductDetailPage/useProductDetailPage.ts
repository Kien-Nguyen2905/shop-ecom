import { useEffect, useState } from 'react';
import {
  useBrandQuery,
  useCategoryByIdQuery,
  useProductByIdQuery,
  useWarehouse,
} from '../../queries';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import {
  TDisplayProductInforProps,
  TDisplayProductTabsProps,
} from './components/tyings';
import { useForm } from 'react-hook-form';
import { TAddcartPayload } from '../../components/ProductItem/tyings';
import { handleError } from '../../libs';
import { useDispatch } from 'react-redux';
import { AppDispatch, useSelector } from '../../store/store';
import { addToCart } from '../../store/middlewares/cartMiddleware';
import { useReviewByProductIdQuery } from '../../queries/useReview';
import { useMainContext } from '../../context/MainContextProvider';
import { THUNK_STATUS } from '../../constants';
import { updateWishlist } from '../../store/middlewares/wishlistMiddleWare';
import { message } from 'antd';
import { TUpdateWishlistPayload } from '../../services/Wishlist/tyings';
export const useProductDetailPage = () => {
  const { toggleModal: openModal } = useMainContext();
  const { profile } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const { wishlist } = useSelector((state) => state.wishlist);

  const { id } = useParams();
  const { search } = useLocation();
  const [_, setSearchParams] = useSearchParams();
  const { updateStatus } = useSelector((state) => state.cart);
  const [variantId, setVariantId] = useState<string>(
    new URLSearchParams(search).get('variant') as string,
  );
  const { data: productData, isLoading } = useProductByIdQuery(id);
  const { data: categoryData } = useCategoryByIdQuery(productData?.category_id);
  const { data: brandData } = useBrandQuery();
  const { data: reviewData } = useReviewByProductIdQuery(id!);
  const { data: warehouseData, refetch } = useWarehouse(variantId);

  const [listImage, setListImage] = useState<string[]>();
  const dispatch = useDispatch<AppDispatch>();
  const quantityForm = useForm({
    defaultValues: {
      quantity: '1',
    },
  });

  useEffect(() => {
    const variantIsActive = productData?.variants.find(
      (item) => item._id === variantId,
    );

    if (variantIsActive) {
      setListImage(variantIsActive.images);
    }
  }, [productData, variantId]);
  useEffect(() => {
    refetch();
  }, [variantId]);
  const onChangeVariant = (variantId: string) => {
    setVariantId(variantId);
    const variant = productData?.variants.find(
      (item) => item._id === variantId,
    );
    if (variant) {
      setListImage(variant.images);
      setSearchParams((prev) => ({
        ...prev,
        variant: variantId,
      }));
    }
  };
  const handleAddCart = async (payload: TAddcartPayload) => {
    if (!profile) {
      openModal();
    } else if (payload && updateStatus !== THUNK_STATUS.pending) {
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
  const onAddWishlist = async (payload: TUpdateWishlistPayload) => {
    if (!profile) {
      openModal();
    } else if (payload && updateStatus !== THUNK_STATUS.pending) {
      try {
        const wishListItemExist = wishlist?.products.some(
          (item) => item.variant_id === payload.variant_id,
        );
        if (wishListItemExist) {
          message.warning('Exist item in wishlist');
        } else {
          await dispatch(updateWishlist(payload)).unwrap();
        }
      } catch (error) {
        handleError({
          error,
        });
      }
    }
  };
  const displayProductInforProps: TDisplayProductInforProps = {
    productData: productData!,
    variantId,
    onChangeVariant,
    quantityForm,
    categoryData: categoryData!,
    handleAddCart,
    warehouseData: warehouseData!,
    onAddWishlist,
    brandData: brandData!,
  };
  const displayProductTabsProps: TDisplayProductTabsProps = {
    description: productData?.description!,
    reviewData: reviewData!,
  };
  return {
    displayProductInforProps,
    listImage,
    displayProductTabsProps,
    name: productData?.name,
    isLoading,
  };
};
