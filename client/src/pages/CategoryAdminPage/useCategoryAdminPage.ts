import { useEffect, useState } from 'react';
import { showToast } from '../../libs';
import {
  useCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from '../../queries';
import {
  TCategoryPayload,
  TCategoryResponse,
  TUpdateCategoryPayload,
} from '../../services/Category/tyings';
import dayjs from 'dayjs';
import { Form } from 'antd';

export const useCategoryAdminPage = () => {
  const { data } = useCategoryQuery();
  const createCategory = useCreateCategoryMutation();
  const deleteCategory = useDeleteCategoryMutation();
  const updateCategory = useUpdateCategoryMutation();
  const [errors, setErrors] = useState<Record<string, string>>({}); // Change to an object to handle errors per category
  const [dataCategory, setDataCategory] = useState<TCategoryResponse[]>(data!);
  const [editingKey, setEditingKey] = useState<string>('');
  const [isInserting, setIsInserting] = useState<boolean>(false);
  const [form] = Form.useForm();
  useEffect(() => {
    if (data) {
      setDataCategory(data);
    }
  }, [data]);
  //NOTE: nếu không có useEffect này thì khi click edit sẽ mấy hết giá trị input
  //NOTE: không hợp chung được vì khi insert cũng setDataCategory theo cái list mới với 1 item new
  useEffect(() => {
    if (editingKey) {
      // When editing a record, set form values to the record data
      const record = dataCategory.find((item) => item._id === editingKey);
      if (record) {
        form.setFieldsValue({ name: record.name });
      }
    }
  }, [editingKey, dataCategory, form]);

  const isEditing = (record: TCategoryResponse) => record._id === editingKey;

  const editRecord = (record: Partial<TCategoryResponse>) => {
    setEditingKey(record._id!);
  };

  const cancelRecord = () => {
    setEditingKey('');
    setIsInserting(false);
    setDataCategory(dataCategory.filter((item) => item._id !== 'newItem'));
    setErrors({});
  };

  const deleteRecord = async (record: Partial<TCategoryResponse>) => {
    if (record._id) {
      await handleDelete(record._id);
    }
  };

  const saveRecord = async (key: string, form: any) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataCategory];
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
          // Use a setter to properly update the state
          setDataCategory((prevData) =>
            prevData.map((d) => (d._id === key ? { ...d, name: row.name } : d)),
          );
          setEditingKey('');
          setIsInserting(false);
          setErrors({});
        } else {
          if (errors) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [key]: errors['newItem'] || 'Category name already exists',
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
      } as TCategoryResponse,
      ...dataCategory,
    ];
    setDataCategory(newData);
    setEditingKey('newItem');
    setIsInserting(true);
  };

  const handleCreate = async (
    payload: TCategoryPayload,
  ): Promise<TCategoryResponse | undefined> => {
    try {
      const res = await createCategory.mutateAsync(payload);

      if (res?.data?.data.name) {
        showToast({
          type: 'success',
          message: res?.data.message,
        });
        return res?.data.data as TCategoryResponse;
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
      const res = await deleteCategory.mutateAsync(id);
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
    payload: TUpdateCategoryPayload,
  ): Promise<TCategoryResponse | undefined> => {
    try {
      const res = await updateCategory.mutateAsync(payload);
      if (res?.data.data.name) {
        showToast({
          type: 'success',
          message: res?.data.message,
        });
        return res?.data.data as TCategoryResponse;
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

  const handleQueryProps = {
    dataCategory,
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
