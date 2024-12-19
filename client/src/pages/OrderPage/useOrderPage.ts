import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TModaOpenValue } from './tyings';
import { handleError } from '../../libs';
import reviewService from '../../services/Review/reviewServices';
import { TCreateReviewPayload } from '../../services/Review/tyings';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch, useSelector } from '../../store/store';
import { getOrder } from '../../store/middlewares/orderMiddleWare';

export const useOrderPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orderInfo } = useSelector((state) => state.order);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit, setError, reset } = useForm();
  const [rate, setRate] = useState(0);
  const [productId, setProductId] = useState('');
  const [variantId, setVariantId] = useState('');
  const [orderId, setOrderId] = useState('');

  const openModal = (value: TModaOpenValue) => {
    setIsModalOpen(true);
    setProductId(value.product_id);
    setVariantId(value.variant_id);
    setOrderId(value.order_id);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setRate(0);
    reset();
  };
  const onChangeRate = (value: number) => {
    setRate(value);
  };
  const handlePostReview = async (value: {
    description: string;
    title: string;
  }) => {
    try {
      const payload: TCreateReviewPayload = {
        description: value.description,
        title: value.title,
        order_id: orderId,
        product_id: productId,
        variant_id: variantId,
        rate: rate,
      };
      const res = await reviewService.postReview(payload);
      if (res.data.data._id) {
        closeModal();
        dispatch(getOrder());
        message.success(
          `Successfully! You have a 1 point, Let's use the point at checkout`,
        );
      }
    } catch (error) {
      handleError({
        error,
        setError,
      });
    }
  };
  useEffect(() => {
    dispatch(getOrder());
  }, []);
  const modalProps = {
    openModal,
    closeModal,
    isModalOpen,
    handleSubmit,
    control,
    onChangeRate,
    handlePostReview,
  };
  return { orderInfo, modalProps, openModal };
};
