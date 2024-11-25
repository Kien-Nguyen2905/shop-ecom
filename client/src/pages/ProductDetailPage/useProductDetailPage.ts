import { useEffect, useState } from 'react';
import { useCategoryByIdQuery, useProductByIdQuery } from '../../queries';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import {
  TDisplayProductInforProps,
  TDisplayProductTabsProps,
} from './components/tyings';
import { useForm } from 'react-hook-form';
import { TAddcartPayload } from '../../components/ProductItem/tyings';
import { handleError, showToast } from '../../libs';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addToCart, removeCart } from '../../store/middlewares/cartMiddleware';
import { useReviewByProductIdQuery } from '../../queries/useReview';

export const useProductDetailPage = () => {
  const { id } = useParams();
  const { data: productData, isLoading } = useProductByIdQuery(id);
  const { data: categoryData } = useCategoryByIdQuery(productData?.category_id);
  const { data: reviewData } = useReviewByProductIdQuery(id!);
  const { search } = useLocation();
  const [_, setSearchParams] = useSearchParams();
  const [variantId, setVariantId] = useState<string>(
    new URLSearchParams(search).get('variant') as string,
  );
  const [listImage, setListImage] = useState<string[]>();
  const dispatch = useDispatch<AppDispatch>();
  const quantityForm = useForm({
    defaultValues: {
      quantity: '1',
    },
  });
  useEffect(() => {
    if (productData?.variants && productData.variants[0]?.images) {
      setListImage(productData.variants[0].images);
    }
  }, [productData]);
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
    try {
      const res = await dispatch(addToCart(payload)).unwrap();
      if (res._id) {
        showToast({
          type: 'success',
          message: 'Successfully',
        });
      }
    } catch (error) {
      handleError({
        error,
      });
    }
  };
  const displayProductInforProps: TDisplayProductInforProps = {
    productData: productData!,
    variantId,
    onChangeVariant,
    quantityForm,
    categoryData: categoryData!,
    handleAddCart,
  };
  const displayProductTabsProps: TDisplayProductTabsProps = {
    description: productData?.description!,
    reviewData: reviewData!,
  };
  return { displayProductInforProps, listImage, displayProductTabsProps };
};
