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
  const totalOrders = orderData?.length || 0;
  const today = dayjs().startOf('day');
  const todayOrders =
    orderData?.filter((order) => dayjs(order.created_at).isSame(today, 'day'))
      .length || 0;
  const totalRevenue =
    orderData?.reduce((sum, order) => sum + order.total, 0) || 0;
  const todayRevenue =
    orderData?.reduce(
      (sum, order) =>
        dayjs(order.created_at).isSame(today, 'day') ? sum + order.total : sum,
      0,
    ) || 0;

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
    totalOrders,
    todayOrders,
    totalRevenue,
    todayRevenue,
    openModal,
    orderDetailProps,
  };
};
