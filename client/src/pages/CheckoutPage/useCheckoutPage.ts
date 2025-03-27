import { useEffect, useState } from 'react';
import { AppDispatch, useSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { getCart, updateCart } from '../../store/middlewares/cartMiddleware';
import { message } from 'antd';
import { handleError } from '../../libs';
import { useForm } from 'react-hook-form';
import {
  TCheckoutForm,
  TDistrictsCustom,
  TProVincesCustom,
  TWardsCustom,
} from './tyings';
import { useNavigate } from 'react-router-dom';
import { CUSTOMER_PATHS, THUNK_STATUS } from '../../constants';
import { createOrder } from '../../store/middlewares/orderMiddleWare';
import { generateDesc } from '../../utils';
import { addressServices } from '../../services/Address';

export const useCheckoutPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const desc = generateDesc();
  const navigate = useNavigate();
  const { control, setError, setValue, handleSubmit, reset } =
    useForm<TCheckoutForm>();
  const { profile } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { checkoutStatus } = useSelector((state) => state.order);
  const [appliedPoints, setAppliedPoints] = useState<number>(0);
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dataProvince, setDataProvince] = useState<TProVincesCustom>([]);
  const [dataDistrict, setDataDistrict] = useState<TDistrictsCustom>([]);
  const [dataWard, setDataWard] = useState<TWardsCustom>([]);
  const [valueProvince, setValueProvince] = useState<string>('');
  const [valueDistrict, setValueDistrict] = useState<string>('');
  const [valueWard, setValueWard] = useState<string>('');
  const getDataProvince = async () => {
    try {
      const response = await addressServices.getProvinces();
      if (response.data.data) {
        const province = response.data.data.map((e) => {
          return {
            value: e.code.toString(),
            label: e.name,
          };
        });
        setDataProvince(province);
      }
    } catch (error) {
      handleError({
        error,
        setError,
      });
    }
  };
  const getDataDistrict = async (id: string) => {
    try {
      const res = await addressServices.getDistricts(id);
      if (res.data.data) {
        const district = res.data.data.map((e) => {
          return {
            value: e.code.toString(),
            label: e.name,
          };
        });
        setDataDistrict(district);
      }
    } catch (error) {
      handleError({
        error,
        setError,
      });
    }
  };
  const getDataWard = async (id: string) => {
    try {
      const res = await addressServices.getWards(id);
      if (res.data.data) {
        const ward = res.data.data.map((e) => {
          return {
            value: e.code.toString(),
            label: e.name,
          };
        });
        setDataWard(ward);
      }
    } catch (error) {
      handleError({
        error,
        setError,
      });
    }
  };
  const handleChangeProvince = (idProvince: string) => {
    getDataDistrict(idProvince);
    setValueProvince(idProvince);
    setValue('district', '');
    setValue('ward', '');
    setValueWard('');
    setValueDistrict('');
  };
  const handleChangeDistrict = (idDistrict: string) => {
    getDataWard(idDistrict);
    setValueDistrict(idDistrict);
    setValue('ward', '');
    setValueWard('');
  };
  const handleChangeWard = (idWard: string) => {
    setValueWard(idWard);
  };
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

  const handleCheckout = async (value: TCheckoutForm) => {
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

  const checkoutInfoProps = {
    control,
    dataDistrict,
    dataProvince,
    dataWard,
    handleChangeDistrict,
    handleChangeProvince,
    handleChangeWard,
    valueDistrict,
    valueProvince,
    valueWard,
  };

  const paymentQrProps = {
    isOpen,
    total: cart?.total || 0,
    isConfirmVisible,
    desc,
    handleCancel,
    handleConfirmClose,
    setIsConfirmVisible,
  };

  useEffect(() => {
    if (profile?.address.province) {
      getDataProvince();
      getDataDistrict(profile.address.province || '');
      getDataWard(profile.address.district || '');
      setValueProvince(profile.address.province || '');
      setValueDistrict(profile.address.district || '');
      setValueWard(profile.address.ward || '');
    }
    if (profile) {
      reset({
        full_name: profile.full_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        province: profile.address.province || '',
        district: profile.address.district || '',
        ward: profile.address.ward || '',
        street_address: profile.address.street_address || '',
      });
      dispatch(getCart());
    }
    getDataProvince();
  }, [reset, profile]);
  return {
    checkoutInfoProps,
    paymentQrProps,
    applyEarnPoint,
    appliedPoints,
    availablePoints: profile?.earn_point,
    cart,
    control,
    handleCheckout: handleSubmit(handleCheckout),
  };
};
