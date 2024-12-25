import { useEffect, useState } from 'react';
import { AppDispatch, useSelector } from '../../store/store';
import { useAccountPage } from '../AccountPage/useAccountPage';
import { useDispatch } from 'react-redux';
import { getCart, updateCart } from '../../store/middlewares/cartMiddleware';
import { message } from 'antd';
import { handleError } from '../../libs';
import { useForm } from 'react-hook-form';
import { TCheckoutForm } from './tyings';
import { useNavigate } from 'react-router-dom';
import { CUSTOMER_PATHS, THUNK_STATUS } from '../../constants';
import { createOrder } from '../../store/middlewares/orderMiddleWare';
import { generateDesc } from '../../utils';

export const useCheckoutPage = () => {
  const desc = generateDesc();
  const navigate = useNavigate();
  const { control, setError, handleSubmit, reset } = useForm<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { checkoutStatus } = useSelector((state) => state.order);
  const [appliedPoints, setAppliedPoints] = useState<number>(0);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
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

  const handleCancel = (isOutTime?: boolean) => {
    setIsConfirmVisible(true);
    if (isOutTime) {
      handleConfirmClose();
    }
  };

  const handleConfirmClose = () => {
    setIsConfirmVisible(false);
    onClose();
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
        value.type_payment &&
        checkoutStatus !== THUNK_STATUS.pending
      ) {
        const dataCOD = await dispatch(
          createOrder({
            note: value.note,
            phone: value.phone,
            address: {
              province: value.province,
              district: value.district,
              ward: value.ward,
              street_address: value.street_address,
            },
            products: cart?.products!,
            earn_point: appliedPoints || 0,
            type_payment: +value.type_payment,
            content: value.type_payment === '1' ? desc : '',
          }),
        ).unwrap();
        if (dataCOD?._id && value.type_payment === '0') {
          message.success('Order successfully');
          navigate(CUSTOMER_PATHS.CHECKOUT_SUCCESS);
        } else {
          navigate(`payment?order=${dataCOD?._id}`);
        }
      }
    } catch (error) {
      handleError({
        error,
        setError,
      });
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
    total: cart?.total!,
    isConfirmVisible,
    desc,
    handleCancel,
    handleConfirmClose,
    setIsConfirmVisible,
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
      dispatch(getCart());
    }
  }, [reset, profile]);
  return {
    checkoutInforProps,
    paymentQrProps,
    applyEarnPoint,
    appliedPoints,
    availablePoints: profile?.earn_point,
    cart,
    control,
    handlCheckout,
    handleSubmit,
  };
};
