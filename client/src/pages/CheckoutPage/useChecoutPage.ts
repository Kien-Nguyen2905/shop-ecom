import { useEffect, useMemo, useState } from 'react';
import { AppDispatch, useSelector } from '../../store/store';
import { useAccountPage } from '../AccountPage/useAccountPage';
import { useDispatch } from 'react-redux';
import { updateCart } from '../../store/middlewares/cartMiddleware';
import { message } from 'antd';
import { handleError } from '../../libs';
import { useForm } from 'react-hook-form';
import { TCheckoutForm, TValueFormBanking } from './tyings';
import { generateDesc } from '../../utils';
import {
  createOrderByBanking,
  createOrderByCOD,
} from '../../store/middlewares/orderMiddleWare';
import { useNavigate } from 'react-router-dom';
import { CUSTOMER_PATHS, THUNK_STATUS } from '../../constants';

export const useCheckoutPage = () => {
  const navigate = useNavigate();
  const { control, setError, handleSubmit, reset } = useForm<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state) => state.auth);
  const { cartInfo } = useSelector((state) => state.cart);
  const { checkoutStatus } = useSelector((state) => state.order);
  const [appliedPoints, setAppliedPoints] = useState<number>(0);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [valueForm, setValueForm] = useState<TValueFormBanking>();
  const desc = useMemo(() => generateDesc(), []);
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

  const handleCancel = () => {
    setIsConfirmVisible(true);
  };

  const handleConfirmClose = () => {
    setIsConfirmVisible(false);
    onClose();
  };

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
      } else if (
        value.type_payment === '0' &&
        checkoutStatus !== THUNK_STATUS.pending
      ) {
        const dataCOD = await dispatch(
          createOrderByCOD({
            ...value,
            address: {
              province: value.province,
              district: value.district,
              ward: value.ward,
              street_address: value.street_address,
            },
            total: cartInfo?.total!,
            products: cartInfo?.products!,
            earn_point: appliedPoints || 0,
            type_payment: 0,
          }),
        ).unwrap();
        if (dataCOD?._id) {
          message.success('Order successfully');
          navigate(CUSTOMER_PATHS.CHECKOUT_SUCCESS);
        }
      } else {
        setValueForm({
          products: cartInfo?.products!,
          address: {
            province: value.province,
            district: value.district,
            ward: value.ward,
            street_address: value.street_address,
          },
          phone: value.phone,
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

  const handleTransactionSePay = async () => {
    try {
      if (cartInfo?.total && valueForm) {
        const res = await dispatch(
          createOrderByBanking({
            desc,
            value: cartInfo?.total,
            order: valueForm,
          }),
        ).unwrap();
        if (res?._id) {
          handleConfirmClose();
          message.success('Order successfully');
          navigate(CUSTOMER_PATHS.CHECKOUT_SUCCESS);
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
