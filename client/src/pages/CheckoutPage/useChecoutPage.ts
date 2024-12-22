import { useEffect, useState } from 'react';
import { AppDispatch, useSelector } from '../../store/store';
import { useAccountPage } from '../AccountPage/useAccountPage';
import { useDispatch } from 'react-redux';
import { getCart, updateCart } from '../../store/middlewares/cartMiddleware';
import { message } from 'antd';
import { handleError } from '../../libs';
import { useForm } from 'react-hook-form';
import { TCheckoutForm, TValueFormBanking } from './tyings';
import {
  createOrderByBanking,
  createOrderByCOD,
} from '../../store/middlewares/orderMiddleWare';
import { useNavigate } from 'react-router-dom';
import { CUSTOMER_PATHS, THUNK_STATUS } from '../../constants';
import { useMainContext } from '../../context/MainConTextProvider';
import { generateDesc } from '../../utils';
import orderServices from '../../services/Order/orderServices';

export const useCheckoutPage = () => {
  const { desc, setDesc } = useMainContext();
  const navigate = useNavigate();
  const { control, setError, handleSubmit, reset } = useForm<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { checkoutStatus } = useSelector((state) => state.order);
  const [appliedPoints, setAppliedPoints] = useState<number>(0);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [valueForm, setValueForm] = useState<TValueFormBanking>();
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
        await orderServices.checkStock(cart?.products!);
        const dataCOD = await dispatch(
          createOrderByCOD({
            ...value,
            address: {
              province: value.province,
              district: value.district,
              ward: value.ward,
              street_address: value.street_address,
            },
            total: cart?.total!,
            products: cart?.products!,
            earn_point: appliedPoints || 0,
            type_payment: 0,
          }),
        ).unwrap();
        if (dataCOD?._id) {
          message.success('Order successfully');
          navigate(CUSTOMER_PATHS.CHECKOUT_SUCCESS);
        }
      } else {
        await orderServices.checkStock(cart?.products!);
        setValueForm({
          products: cart?.products!,
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
      if (cart?.total && valueForm) {
        const res = await dispatch(
          createOrderByBanking({
            desc,
            value: cart?.total,
            order: valueForm,
          }),
        ).unwrap();

        if (res?._id) {
          await handleConfirmClose();
          setDesc(generateDesc());
          message.success('Order successfully');
          navigate(CUSTOMER_PATHS.CHECKOUT_SUCCESS);
        }
        return res;
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
    total: cart?.total!,
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
