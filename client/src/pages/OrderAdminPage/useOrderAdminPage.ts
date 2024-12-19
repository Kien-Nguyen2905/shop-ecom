import dayjs from 'dayjs';
import {
  useOrderAllQuery,
  useUpdateStatusOrderMutation,
} from '../../queries/useOrder';
import { useUserAllQuery } from '../../queries/useUser';
import { useState } from 'react';
import { TOrderItem } from './tyings';
import { TUserAllResponse } from '../../services/User/tyings';
import { TOrderDetailProps } from './components/tyings';
import { TProductOrder, TUpdateStatusOrder } from '../../services/Order/tyings';
import { handleError, showToast } from '../../libs';

export const useOrderAdminPage = () => {
  const { data: orderData } = useOrderAllQuery();
  const { data: userData } = useUserAllQuery();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userDetail, setUserDetail] = useState<TUserAllResponse>();
  const [orderDetail, setOrderDetail] = useState<TOrderItem>();

  const { mutateAsync: updateStatusOrder } = useUpdateStatusOrderMutation({
    onSuccess: (data) => {
      showToast({
        type: 'success',
        message: data?.data.message || '',
      });
      closeModal();
    },
    onError: (error) => {
      handleError({ error });
    },
  });
  const openModal = (order: TOrderItem) => {
    if (order) {
      setOrderDetail(order);
      setUserDetail(userData?.find((item) => item._id === order.user_id));
      setIsOpenModal(true);
    }
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };
  // Calculate totals
  // Calculate totals
  const today = dayjs().startOf('day');

  // Tổng số lượng đơn hàng hôm nay
  const todayOrders =
    orderData?.filter((order) => dayjs(order.created_at).isSame(today, 'day'))
      .length || 0;

  // Tổng số lượng đơn hàng chờ hôm nay (pending = 0)
  const todayPendingOrders =
    orderData?.filter(
      (order) =>
        order.status === 0 && dayjs(order.created_at).isSame(today, 'day'),
    ).length || 0;

  // Tổng số lượng đơn hàng chấp nhận hôm nay (accepted = 1)
  const todayAcceptedOrders =
    orderData?.filter(
      (order) =>
        order.status === 1 && dayjs(order.created_at).isSame(today, 'day'),
    ).length || 0;

  // Tổng số lượng đơn hàng từ chối hôm nay (rejected = 2)
  const todayRejectedOrders =
    orderData?.filter(
      (order) =>
        order.status === 2 && dayjs(order.created_at).isSame(today, 'day'),
    ).length || 0;

  const tableProductData = orderDetail?.products?.map(
    (product: TProductOrder) => ({
      key: product.product_id,
      name: product.name,
      vairant: product.color,
      image: product.image,
      price: product.price * (1 - product.discount),
      quantity: product.quantity,
      total: product.quantity * product.price * (1 - product.discount),
    }),
  );

  const handleOrder = async (payload: TUpdateStatusOrder) => {
    await updateStatusOrder(payload);
  };
  const orderDetailProps: TOrderDetailProps = {
    isOpenModal,
    userDetail: userDetail!,
    orderDetail: orderDetail!,
    closeModal,
    tableProductData: tableProductData!,
    handleOrder,
  };

  return {
    orderData,
    userData,
    todayOrders,
    todayPendingOrders,
    todayAcceptedOrders,
    todayRejectedOrders,
    openModal,
    orderDetailProps,
  };
};
