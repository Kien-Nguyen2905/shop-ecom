import { useEffect, useState } from 'react';
import { useCreateProductMutation } from '../../../../queries';
import { useUploadImageMutation } from '../../../../queries/useImage';
import { UploadFile, UploadProps } from 'antd';
import { FormValues } from '../tyings';
import { useForm } from 'react-hook-form';
import { useInformationByIdQuery } from '../../../../queries/useInformation';
import { handleError, showToast } from '../../../../libs';
import { useProductAdminPage } from '../../useProductAdminPage';

export const useAddProduct = () => {
  const { closeModalView } = useProductAdminPage();
  const uploadImage = useUploadImageMutation();
  const createProduct = useCreateProductMutation();
  const [activeKey, setActiveKey] = useState<string[]>(['0']);
  const [categoryId, setCategoryId] = useState('');
  const { data: dataInformation } = useInformationByIdQuery(categoryId);
  const [variants, setVariants] = useState<any[]>([
    {
      index: 0,
      color: '',
      price: 0,
      stock: 0,
      discount: 0,
      images: [],
    },
  ]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadedImages, setUploadedImages] = useState<{
    [key: number]: any[];
  }>({});
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      category_id: '',
      brand_id: '',
      description: '',
      thumbnail: '',
      variants: [
        {
          index: 0,
          color: '',
          price: 0,
          stock: 0,
          discount: 0,
          images: [],
        },
      ],
      featured: {
        isPopular: false,
        isRated: false,
        onSale: false,
      },
      minimum_stock: 0,
      attributes: {},
    },
  });
  useEffect(() => {
    // Reset the attributes to ensure it's updated with new keys and values
    if (dataInformation?.attributes) {
      // Reset the form values, passing the new attributes
      reset({
        ...getValues(), // Keep existing values that are not related to attributes
        attributes: {}, // Update only the attributes
      });
    }
  }, [dataInformation?.attributes, reset, getValues]);
  const showAttributeByCategory = (categoryId: string) => {
    setCategoryId(categoryId);
  };
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setValue('thumbnail', newFileList[0].originFileObj);
  };

  const onChangeVariant = async (
    { fileList: newFileList }: { fileList: any[] },
    variantIndex: number,
  ) => {
    setUploadedImages((prevState) => ({
      ...prevState,
      [variantIndex]: newFileList,
    }));
  };

  const handleCollapseChange = (key: string | string[]) => {
    setActiveKey(Array.isArray(key) ? key : [key]);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleAddVariant = () => {
    const newVariant = {
      index: variants.length,
      color: '',
      price: '',
      stock: '',
      discount: 0,
      images: [],
    };
    setVariants([...variants, newVariant]);
  };

  const handleRemoveVariant = (index: number) => {
    if (variants.length > 1) {
      // Prevent removing the last variant
      const newVariants = [...variants];
      const newVariant = newVariants?.filter((_, i) => i != index);
      setVariants(newVariant);
    }
  };

  const handleSaveProduct = async (values: any) => {
    try {
      if (variants.length >= 1) {
        values.variants = variants;
        values.featured.isRated = false;
        Number(values.minimum_stock);
        // Upload thumbnail nếu có
        if (values.thumbnail) {
          const formDataThumbnail = new FormData();
          formDataThumbnail.append('image', values.thumbnail);
          const res = await uploadImage.mutateAsync(formDataThumbnail);
          if (res.data.data[0]) {
            values.thumbnail = res.data.data[0];
          }
        }

        // Duyệt qua từng variant và upload ảnh cho mỗi variant
        if (uploadedImages) {
          for (const [index, files] of Object.entries(uploadedImages)) {
            const formData = new FormData();

            // Duyệt qua các file trong mỗi variant
            files.forEach((file: any) => {
              formData.append('image', file.originFileObj); // Append từng file vào formData
            });

            // Upload ảnh cho mỗi variant
            const res = await uploadImage.mutateAsync(formData);

            // Giả sử trả về đường dẫn ảnh, gán vào values.variants[index]
            if (res.data.data) {
              // Cập nhật lại values.variants[index] với ảnh đã upload
              values.variants[parseInt(index)].images = res.data.data;
            }
          }
        }

        const res = await createProduct.mutateAsync(values);
        if (res.data.data._id) {
          closeModalView();
          showToast({
            type: 'success',
            message: res.data.message,
          });
        }
      } else {
        showToast({
          type: 'error',
          message: 'Variant must be required',
        });
      }
    } catch (error) {
      handleError({
        error,
        setError,
      });
      console.error('Error saving product:', error);
    }
  };

  return {
    variants,
    setVariants,
    watch,
    handleSubmit,
    handleSaveProduct,
    control,
    errors,
    onChange,
    onPreview,
    setValue,
    fileList,
    activeKey,
    handleCollapseChange,
    onChangeVariant,
    uploadedImages,
    handleRemoveVariant,
    handleAddVariant,
    dataInformation,
    showAttributeByCategory,
  };
};
