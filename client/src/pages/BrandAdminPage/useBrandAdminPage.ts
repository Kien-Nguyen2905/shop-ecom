import { useEffect, useState } from 'react';
import { showToast } from '../../libs';
import {
  useBrandQuery,
  useCreateBrandMutation,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} from '../../queries';

import dayjs from 'dayjs';
import { Form } from 'antd';
import {
  TBrand,
  TBrandPayload,
  TBrandResponse,
  TCreateBrandResponse,
  TUpdateBrandPayload,
  TUpdateBrandResponse,
} from '../../services/Brand/tyings';

export const useBrandAdminPage = () => {
  const { data } = useBrandQuery();
  const createBrand = useCreateBrandMutation();
  const deleteBrand = useDeleteBrandMutation();
  const updateBrand = useUpdateBrandMutation();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dataBrand, setDataBrand] = useState<TBrandResponse>(
    data as TBrandResponse,
  );
  const [editingKey, setEditingKey] = useState<string>('');
  const [isInserting, setIsInserting] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleCreate = async (
    payload: TBrandPayload,
  ): Promise<TCreateBrandResponse | undefined> => {
    try {
      const res = await createBrand.mutateAsync(payload);
      if (res.data.data._id) {
        showToast({
          type: 'success',
          message: res?.data.message,
        });
        return res?.data.data;
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          newItem: error?.response?.data?.message,
        }));
      }
      showToast({
        type: 'error',
        message: error?.response?.data?.message,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteBrand.mutateAsync(id);
      if (res?.data.message) {
        showToast({
          type: 'success',
          message: res?.data.message,
        });
      }
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error?.response?.data?.message,
      });
    }
  };

  const handleUpdate = async (
    payload: TUpdateBrandPayload,
  ): Promise<TUpdateBrandResponse | undefined> => {
    try {
      const res = await updateBrand.mutateAsync(payload);
      if (res?.data.data._id) {
        showToast({
          type: 'success',
          message: res?.data.message,
        });
        return res?.data.data;
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          newItem: error?.response?.data?.message,
        }));
      }
      showToast({
        type: 'error',
        message: error?.response?.data?.message,
      });
    }
  };

  const isEditing = (record: TBrand) => record._id === editingKey;

  const editRecord = (record: TBrand) => {
    setEditingKey(record._id!);
  };

  const cancelRecord = () => {
    setEditingKey('');
    setIsInserting(false);
    setDataBrand(dataBrand.filter((item) => item._id !== 'newItem'));
    setErrors({});
  };

  const deleteRecord = async (record: TBrand) => {
    if (record._id) {
      await handleDelete(record._id);
    }
  };

  const saveRecord = async (key: string, form: any) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataBrand];
      const index = newData.findIndex((item) => key === item._id);

      if (index > -1) {
        const item = newData[index];
        let result;
        if (item._id === 'newItem') {
          result = await handleCreate({ name: row.name });
        } else {
          if (item.name !== row.name) {
            result = await handleUpdate({
              id: item._id,
              payload: { name: row.name },
            });
          } else {
            setEditingKey('');
            setIsInserting(false);
            setErrors({});
            return;
          }
        }

        if (result) {
          setDataBrand((prevData) =>
            prevData.map((d) => (d._id === key ? { ...d, name: row.name } : d)),
          );
          setEditingKey('');
          setIsInserting(false);
          setErrors({});
        } else {
          if (errors) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [key]: errors['newItem'] || 'Brand name already exists',
            }));
          }
        }
      }
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: error.errorFields[0].errors[0],
      }));
      showToast({
        type: 'error',
        message: error.errorFields[0].errors[0],
      });
    }
  };

  const insertRecord = () => {
    const newData = [
      {
        _id: 'newItem',
        name: '',
        created_at: dayjs().toISOString(),
        updated_at: dayjs().toISOString(),
      } as TBrand,
      ...dataBrand,
    ];
    setDataBrand(newData);
    setEditingKey('newItem');
    setIsInserting(true);
  };

  useEffect(() => {
    if (data) {
      setDataBrand(data);
    }
  }, [data]);
  //NOTE: nếu không có useEffect này thì khi click edit sẽ mấy hết giá trị input
  //NOTE: không hợp chung được vì khi insert cũng setDataBrand theo cái list mới với 1 item new
  useEffect(() => {
    if (editingKey) {
      const record = dataBrand.find((item) => item._id === editingKey);
      if (record) {
        form.setFieldsValue({ name: record.name });
      }
    }
  }, [editingKey, dataBrand, form]);

  const handleQueryProps = {
    dataBrand,
    errors,
  };

  const handleTableProps = {
    form,
    editingKey,
    isInserting,
    isEditing,
    editRecord,
    cancelRecord,
    deleteRecord,
    saveRecord,
    insertRecord,
  };
  return {
    handleQueryProps,
    handleTableProps,
  };
};
