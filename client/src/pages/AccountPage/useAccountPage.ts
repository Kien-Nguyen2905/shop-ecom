import { useForm } from 'react-hook-form';
import { AppDispatch, useSelector } from '../../store/store';
import { useEffect, useState } from 'react';

import { addressServices } from '../../services/Address';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { handleError } from '../../libs';
import { TAddressModify, TUpdateProfilePayload, TValueForm } from './tyings';
import { updateProfileUser } from '../../store/middlewares/authMiddleWare';

export const useAccountPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state) => state.auth);
  const [dataProvince, setDataProvince] = useState<any>([]);
  const [dataDistrict, setDataDistrict] = useState<any>([]);
  const [dataWard, setDataWard] = useState<any>([]);
  const [valueProvince, setValueProvince] = useState<string>();
  const [valueDistrict, setValueDistrcit] = useState<string>();
  const [valueWard, setValueWard] = useState<string>();

  const getDataProvince = async () => {
    try {
      const response = await addressServices.getProvices();
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
    const res = await addressServices.getWards(id);
    try {
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
    setValueWard('');
    setValueDistrcit('');
  };
  const handleChangeDistrict = (idDistrict: string) => {
    getDataWard(idDistrict);
    setValueDistrcit(idDistrict);
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

  const { handleSubmit, control, setError, reset } = useForm<any>();

  useEffect(() => {
    if (profile?.address.province) {
      getDataProvince();
      getDataDistrict(profile?.address.province);
      getDataWard(profile?.address?.district || '');
      setValueProvince(profile?.address.province);
      setValueDistrcit(profile?.address?.district || '');
      setValueWard(profile.address.ward || '');
    }
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
    getDataProvince();
  }, [profile, reset]);
  return {
    handleSubmit,
    handleChangeProvince,
    valueProvince,
    dataProvince,
    handleChangeDistrict,
    dataDistrict,
    valueDistrict,
    handleChangeWard,
    dataWard,
    valueWard,
    control,
    setError,
    reset,
    profile,
    handleUpdateProfile,
  };
};
