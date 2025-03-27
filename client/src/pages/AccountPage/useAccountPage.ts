import { useForm } from 'react-hook-form';
import { AppDispatch, useSelector } from '../../store/store';
import { useEffect, useState } from 'react';

import { addressServices } from '../../services/Address';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { handleError } from '../../libs';
import { TAddressModify, TUpdateProfilePayload, TValueForm } from './tyings';
import { updateProfileUser } from '../../store/middlewares/authMiddleWare';
import {
  TDistrictsCustom,
  TProVincesCustom,
  TWardsCustom,
} from '../CheckoutPage/tyings';

export const useAccountPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state) => state.auth);
  const { handleSubmit, setValue, control, setError, reset } =
    useForm<TValueForm>();
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

  const handleUpdateProfile = async (payloadForm: TValueForm) => {
    try {
      const address: TAddressModify = {
        province: payloadForm.province,
        district: payloadForm.district,
        ward: payloadForm.ward,
        street_address: payloadForm.street_address,
      };
      const payload: TUpdateProfilePayload = {
        full_name: payloadForm.full_name,
        email: payloadForm.email,
        phone: payloadForm.phone,
        address,
      };
      const res = await dispatch(updateProfileUser(payload)).unwrap();
      if (res?.data._id) {
        message.success('Update success');
      }
    } catch (error) {
      handleError({
        error,
        setError,
      });
    }
  };

  useEffect(() => {
    if (profile?.address.province) {
      getDataProvince();
      getDataDistrict(profile.address.province || '');
      getDataWard(profile.address.district || '');
      setValueProvince(profile.address.province);
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
    }
    getDataProvince();
  }, [profile, reset]);
  return {
    control,
    valueProvince,
    dataProvince,
    handleChangeProvince,
    handleChangeDistrict,
    dataDistrict,
    valueDistrict,
    handleChangeWard,
    dataWard,
    valueWard,
    handleUpdateProfile: handleSubmit(handleUpdateProfile),
  };
};
