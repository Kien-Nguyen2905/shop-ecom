import { useEffect, useMemo, useState } from 'react';
import { AppDispatch, useSelector } from '../../store/store';
import { useAccountPage } from '../AccountPage/useAccountPage';
import { useDispatch } from 'react-redux';
import { getCart, updateCart } from '../../store/middlewares/cartMiddleware';
import { message } from 'antd';
import { handleError } from '../../libs';
import { useForm } from 'react-hook-form';
import { TCheckoutForm, TValueForm } from './tyings';
import { transactionServices } from '../../services/Transaction';
import orderServices from '../../services/Order/orderServices';
import { generateDesc } from '../../utils';

export const useCheckoutPage = () => {
  const { control, setError, handleSubmit, reset } = useForm<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state) => state.auth);
  const { cartInfo } = useSelector((state) => state.cart);
  const [appliedPoints, setAppliedPoints] = useState<number>(0);
  const desc = useMemo(() => generateDesc(), []);
  const [valueForm, setValueForm] = useState<TValueForm | undefined>();
  const {
    valueProvince,
    dataProvince,
    handleChangeProvince,
    handleChangeDistrict,
    dataDistrict,
    valueDistrict,
    handleChangeWard,
    dataWard,
    valueWard,
  } = useAccountPage();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };
  const applyEarnPoint = async (points: number) => {
    try {
      const res = await dispatch(updateCart(points)).unwrap();
      if (res._id) {
        message.success('Applied successfully');
        setAppliedPoints(points);
      }
    } catch (error) {
      handleError({
        error,
      });
    }
  };

  const handlCheckout = async (value: TCheckoutForm) => {
    try {
      if (!value.type_payment) {
        message.error('Please choose method payment');
      } else if (value.type_payment === '0') {
        const { data } = await transactionServices.createTransactionCOD({
          type_payment: value.type_payment,
          value: cartInfo?.total!,
        });
        if (data.data._id) {
          const res = await orderServices.createOrder({
            products: cartInfo?.products!,
            transaction_id: data.data._id!,
            address: {
              province: value.province,
              district: value.district,
              ward: value.ward,
              street_address: value.street_address,
            },
            earn_point: appliedPoints || 0,
            note: value.note || '',
            type_payment: 0,
          });
          if (res.data.data._id) {
            await dispatch(getCart());
            message.success('Order successfully');
          }
        }
      } else {
        setValueForm({
          products: cartInfo?.products!,
          transaction_id: '',
          address: {
            province: value.province,
            district: value.district,
            ward: value.ward,
            street_address: value.street_address,
          },
          earn_point: appliedPoints || 0,
          note: value.note || '',
          type_payment: 1,
        });
        onOpen();
      }
    } catch (error) {
      handleError({
        error,
        setError,
      });
    }
  };

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const handleCancel = () => {
    setIsConfirmVisible(true);
  };

  const handleConfirmClose = () => {
    setIsConfirmVisible(false);
    onClose();
  };
  const handleTransactionSePay = async () => {
    try {
      const { data } = await transactionServices.getTransactionSePay(
        `?content=${desc}&value=${cartInfo?.total}`,
      );
      if (data.data._id) {
        const res = await orderServices.createOrder({
          ...valueForm!,
          transaction_id: data.data._id!,
        });
        if (res.data.data._id) {
          await dispatch(getCart());
          message.success('Order successfully');
          handleConfirmClose();
        }
      }
    } catch (error) {
      handleError({ error });
    }
  };

  const checkoutInforProps = {
    control,
    handleSubmit,
    valueProvince,
    dataProvince,
    handleChangeProvince,
    handleChangeDistrict,
    dataDistrict,
    valueDistrict,
    handleChangeWard,
    dataWard,
    valueWard,
  };
  const paymentQrProps = {
    isOpen,
    total: cartInfo?.total!,
    isConfirmVisible,
    desc,
    handleCancel,
    handleConfirmClose,
    setIsConfirmVisible,
    handleTransactionSePay,
  };
  useEffect(() => {
    if (profile) {
      reset({
        full_name: profile.full_name,
        email: profile.email,
        phone: profile.phone,
        province: profile?.address?.province,
        district: profile?.address?.district,
        ward: profile?.address?.ward,
        street_address: profile?.address.street_address,
      });
    }
  }, [reset, profile]);
  return {
    checkoutInforProps,
    paymentQrProps,
    applyEarnPoint,
    appliedPoints,
    availablePoints: profile?.earn_point,
    cartInfo,
    control,
    handlCheckout,
    handleSubmit,
  };
};
