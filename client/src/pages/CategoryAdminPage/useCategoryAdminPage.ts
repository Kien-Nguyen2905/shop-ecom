import { useEffect, useState } from 'react';
import { handleError, showToast } from '../../libs';
import {
  useCategoryByIdQuery,
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
import {
  useCreateInformationMutation,
  useInformationByIdQuery,
  useUpdateInformationMutation,
} from '../../queries/useInformation';
import { useForm } from 'react-hook-form';
import { TFormValues } from './tyings.';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_PATHS } from '../../constants';
import { removeAccents } from '../../utils';
import { TUpdateInformationPayload } from '../../services/Information/tyings';

export const useCategoryAdminPage = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, reset, setValue, setError } =
    useForm<TFormValues>({
      defaultValues: {
        name: '',
        attributes: undefined,
      },
    });
  const { data } = useCategoryQuery();

  const [isOpen, setIsOpen] = useState(false);
  const [isMultipleMode, setIsMultipleMode] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  const [fieldValues, setFieldValues] = useState<string[]>([]);
  const [singleAttribute, setSingleAttribute] = useState('');

  const createCategory = useCreateCategoryMutation();
  const createInformation = useCreateInformationMutation();
  const deleteCategory = useDeleteCategoryMutation();
  const updateCategory = useUpdateCategoryMutation();
  const updadetInformation = useUpdateInformationMutation();

  const [dataCategory, setDataCategory] = useState<TCategoryResponse[]>(data!);

  const [attributes, setAttributes] = useState<Record<string, any>>({});
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const categoryId = urlParams.get('categoryId') || '';
  const { data: informationData } = useInformationByIdQuery(categoryId);
  const { data: categoryData } = useCategoryByIdQuery(categoryId);

  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (data) {
      setDataCategory(data);
    }
    if (isOpen) {
      if (informationData?.attributes) {
        setAttributes(informationData?.attributes);
      }
      if (categoryData) {
        setValue('name', categoryData.name);
      }
    }
  }, [isOpen, informationData, categoryData, data]);

  const openDrawer = async ({
    categoryId,
    isEdit = false,
  }: {
    categoryId: string;
    isEdit?: boolean;
  }) => {
    if (categoryId) {
      navigate(`?categoryId=${categoryId}`);
      if (isEdit) {
        setIsView(false);
        setIsEdit(true);
      } else {
        setIsView(true);
      }
    } else {
      setIsView(false);
    }
    setIsOpen(true);
  };

  const closeDrawer = async () => {
    setIsOpen(false);
    setAttributes({});
    setIsMultipleMode(false);
    setNewFieldName('');
    setFieldValues([]);
    setSingleAttribute('');
    reset(); // Reset form state
    navigate(ADMIN_PATHS.CATEGORY);
  };

  const handleCreate = async (
    payload: TCategoryPayload & {
      attributes: {};
    },
  ) => {
    try {
      const res = await createCategory.mutateAsync(payload);

      const resInformation = await createInformation.mutateAsync({
        category_id: res.data.data._id,
        attributes: payload.attributes,
      });
      if (res?.data?.data._id && resInformation.data.data._id) {
        showToast({
          type: 'success',
          message: res?.data.message,
        });
        closeDrawer();
      }
    } catch (error: any) {
      handleError({
        error,
        setError,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCategory.mutateAsync(id);
      if (res?.data.status === 200) {
        showToast({
          type: 'success',
          message: res?.data.message,
        });
      }
    } catch (error: any) {
      handleError({
        error,
        setError,
      });
    }
  };

  const handleUpdateCatgory = async (payload: TUpdateCategoryPayload) => {
    try {
      const res = await updateCategory.mutateAsync(payload);
      if (res?.data.data.name) {
        showToast({
          type: 'success',
          message: res?.data.message,
        });
      }
    } catch (error: any) {
      handleError({
        error,
        setError,
      });
      showToast({
        type: 'error',
        message: error?.response?.data?.message,
      });
    }
  };

  const handleUpdateInformation = async (
    payload: TUpdateInformationPayload,
  ) => {
    try {
      await updadetInformation.mutateAsync(payload);
    } catch (error: any) {
      handleError({
        error,
        setError,
      });
      showToast({
        type: 'error',
        message: error?.response?.data?.message,
      });
    }
  };

  const handleAddAttribute = () => {
    if (singleAttribute) {
      setAttributes((prev: any) => ({
        ...prev,
        [singleAttribute]: singleAttribute,
      }));
      setSingleAttribute('');
    }
  };

  const handleAddMultipleField = () => {
    if (newFieldName && fieldValues.length > 0) {
      setAttributes((prev: any) => ({
        ...prev,
        [newFieldName]: fieldValues,
      }));
      setNewFieldName('');
      setFieldValues([]);
    }
  };

  const onSubmit = async (
    data: TCategoryPayload & { attributes: Record<string, string | []> },
  ) => {
    const payload = { ...data, attributes };
    const attributesConvert = Object.keys(attributes).reduce((acc, key) => {
      const newKey = removeAccents(key);
      acc[newKey] = attributes[key];
      return acc;
    }, {} as Record<string, any>);
    if (isEdit) {
      await handleUpdateCatgory({
        id: categoryId,
        payload: { name: data.name },
      });
      if (informationData?._id) {
        await handleUpdateInformation({
          id: informationData?._id!,
          payload: { attributes: attributesConvert, category_id: categoryId },
        });
      } else {
        await createInformation.mutateAsync({
          category_id: categoryId,
          attributes: attributesConvert,
        });
      }
    } else {
      await handleCreate({ ...payload, attributes: attributesConvert });
    }
  };

  const handleRemoveInput = (index: number) => {
    // Xoá index tồn tại trong mảng theo index được click
    const newAttibute = fieldValues?.filter((_, i) => i != index);
    setFieldValues(newAttibute);
  };
  const handleQueryProps = {
    dataCategory,
  };
  const handleTableProps = {
    handleAddAttribute,
    handleAddMultipleField,
    onSubmit,
    setIsMultipleMode,
    isMultipleMode,
    singleAttribute,
    fieldValues,
    newFieldName,
    setSingleAttribute,
    setNewFieldName,
    setFieldValues,
    isOpen,
    handleCreate,
    openDrawer,
    closeDrawer,
    setAttributes,
    attributes,
    control,
    handleSubmit,
    reset,
    handleDelete,
    handleRemoveInput,
    isView,
  };
  return {
    handleQueryProps,
    handleTableProps,
  };
};
