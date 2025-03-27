import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TModaOpenValue } from './tyings';
import { handleError } from '../../libs';
import reviewService from '../../services/Review/reviewServices';
import { TCreateReviewPayload } from '../../services/Review/tyings';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch, useSelector } from '../../store/store';
import { cancelOrder, getOrder } from '../../store/middlewares/orderMiddleWare';
import { TFormValues, TModalViewProps } from './components/tyings';
import {
  useDistrictsQuery,
  useProvincesQuery,
  useWardsQuery,
} from '../../queries';

export const useOrderPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orderInfo } = useSelector((state) => state.order);
  const { data: provinceData } = useProvincesQuery();
  const { data: districtData } = useDistrictsQuery();
  const { data: wardData } = useWardsQuery();
  const { control, handleSubmit, setError, reset } = useForm<TFormValues>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rate, setRate] = useState(0);
  const [productId, setProductId] = useState<string>('');
  const [variantId, setVariantId] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');

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
  const handlePostReview = async (value: TFormValues) => {
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
  const handleCancelOrder = async (orderId: string) => {
    try {
      const res = await dispatch(cancelOrder(orderId)).unwrap();
      message.success(res.message);
    } catch (error) {
      handleError({ error });
    }
  };
  useEffect(() => {
    dispatch(getOrder());
  }, []);

  const modalProps: TModalViewProps = {
    closeModal,
    isModalOpen,
    control,
    onChangeRate,
    handlePostReview: handleSubmit(handlePostReview),
  };

  return {
    provinceData,
    districtData,
    wardData,
    orderInfo,
    modalProps,
    openModal,
    handleCancelOrder,
  };
};
