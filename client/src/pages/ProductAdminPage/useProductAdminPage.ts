import { useState, useMemo, useEffect } from 'react';
import {
  useBrandQuery,
  useCategoryQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useProductByIdQuery,
  useProductQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from '../../queries';
import { debounce, isObject } from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_PATHS } from '../../constants';
import { handleError, showToast } from '../../libs';
import { UploadFile, UploadProps } from 'antd';
import { useInformationByIdQuery } from '../../queries';
import { FormValues } from './components/tyings';
import { useForm } from 'react-hook-form';
import { TCategoryResponse } from '../../services/Category/tyings';
import { TProductTableProps } from './tying';
import {
  TProductByIdResponse,
  TProductItem,
} from '../../services/Product/tyings';
import dayjs from 'dayjs';
import { TBrandResponse } from '../../services/Brand/tyings';
import { TInformationResponse } from '../../services/Information/tyings';

export const useProductAdminPage = () => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isView, setIsView] = useState(false);
  const navigate = useNavigate();
  const [queryString, setQueryString] = useState('');
  const { data: productData } = useProductQuery(queryString);
  const categoryList = useCategoryQuery().data as TCategoryResponse;
  const brandList = useBrandQuery().data as TBrandResponse;

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const productId = urlParams.get('productId') || undefined;

  const { data: productDetails } = useProductByIdQuery(productId as string);
  const uploadImage = useUploadImageMutation();
  const createProduct = useCreateProductMutation();
  const updateProduct = useUpdateProductMutation(productId as string);
  const deleteProduct = useDeleteProductMutation();
  const [activeKey, setActiveKey] = useState<string[]>(['0']);
  const [categoryId, setCategoryId] = useState<string>('');
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

  const handleSearch = useMemo(
    () =>
      debounce((query: string) => {
        setQueryString(`?search=${query}&limit=6&page=1`);
        navigate(`?search=${query}&limit=6&page=1`);
      }, 700),
    [],
  );

  const showAttributeByCategory = (categoryId: string) => {
    setCategoryId(categoryId);
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setValue('thumbnail', newFileList[0]?.originFileObj);
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

  const handleSaveProduct = async (values: FormValues) => {
    try {
      if (variants.length >= 1) {
        values.variants = variants;
        values.featured.isRated = false;
        values.minimum_stock = +values.minimum_stock;
        const thumbNail = watch('thumbnail');
        if (productId) {
          // UpdateProduct
          if (productDetails?.variants.length !== values.variants.length)
            // đánh dấu lại index theo thứ tự cho trường hợp remove variant
            values.variants = values.variants.map(
              (item: any, index: number) => {
                return { ...item, index: index };
              },
            );
          // Upload image thumbnail
          if (isObject(thumbNail)) {
            const formDataThumbnail = new FormData();
            formDataThumbnail.append('image', values.thumbnail);
            const res = await uploadImage.mutateAsync(formDataThumbnail);
            if (res.data.data[0]) {
              values.thumbnail = res.data.data[0];
            }
          }
          // Check images change
          const checkImageChange = Object.values(uploadedImages).find((item) =>
            item.some((image) => !image.url),
          );
          if (checkImageChange) {
            for (const [index, files] of Object.entries(uploadedImages)) {
              const formData = new FormData();
              // Lặp qua các file trong mỗi variant để tạo formData
              files.forEach((file: any) => {
                if (file.originFileObj) {
                  formData.append('image', file.originFileObj); // Thêm file vào formData
                }
              });
              if ([...formData.entries()].length > 0) {
                // Giả sử gọi API upload ảnh và nhận URL ảnh trả về từ BE (dạng mảng URL)
                const res = await uploadImage.mutateAsync(formData);
                // Kiểm tra nếu có dữ liệu trả về từ BE
                if (res.data.data && Array.isArray(res.data.data)) {
                  const updatedUrls = res.data.data; // Mảng URL ảnh trả về từ BE
                  // Lấy ảnh cũ tôn tại trong 1 variant trước khi thay đổi
                  const oldImages = files
                    .filter((file: any) => !file.lastModified) // Lọc các file không có lastModified (đã được tải lên trước)
                    .map((file: any) => file.url);

                  // Cập nhật lại variant với URL đã upload

                  values.variants[parseInt(index)].images = oldImages
                    .filter((image: any) => !updatedUrls.includes(image)) // Loại bỏ ảnh bị thay đổi
                    .concat(updatedUrls); // Thêm ảnh mới từ BE vào cuối mảng
                }
              }
            }
          }
          const res = await updateProduct.mutateAsync(values);
          if (res.data.data._id) {
            navigate(ADMIN_PATHS.PRODUCT);
            setCategoryId('');
            reset({});
            setVariants([
              {
                index: 0,
                color: '',
                price: 0,
                stock: 0,
                discount: 0,
                images: [],
              },
            ]);
            setFileList([]);
            setUploadedImages([]);
            closeModalAdd();
            showToast({
              type: 'success',
              message: res.data.message,
            });
          }
        } else {
          // Add product
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
            setCategoryId('');
            reset({
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
            });
            setVariants([
              {
                index: 0,
                color: '',
                price: 0,
                stock: 0,
                discount: 0,
                images: [],
              },
            ]);
            setFileList([]);
            setUploadedImages([]);
            closeModalAdd();
            showToast({
              type: 'success',
              message: res.data.message,
            });
          }
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
    }
  };

  const openViewModal = (productId: string) => {
    navigate(`?productId=${productId}` || '');
    setIsAddProductModalOpen(true);
    setIsView(true);
  };

  const closeModalAdd = () => {
    setIsAddProductModalOpen(false);
    navigate(ADMIN_PATHS.PRODUCT);
    reset({});
  };

  const openModelAdd = () => {
    setIsAddProductModalOpen(true);
  };

  const openUpdateModal = (productId: string) => {
    navigate(`?productId=${productId}` || '');
    setIsAddProductModalOpen(true);
    setIsView(false);
  };

  const handleDelete = async (productId: string) => {
    try {
      const res = await deleteProduct.mutateAsync(productId);
      if (res.status === 200) {
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

  useEffect(() => {
    if (productId) {
      navigate(ADMIN_PATHS.PRODUCT);
    }
  }, []);

  useEffect(() => {
    if (productDetails) {
      setValue('name', productDetails.name);
      setValue('category_id', productDetails.category_id);
      setCategoryId(productDetails.category_id);
      setValue('brand_id', productDetails.brand_id);
      setValue('description', productDetails.description);
      setValue('thumbnail', productDetails.thumbnail);
      setValue('featured', productDetails.featured);
      setValue('minimum_stock', productDetails.minimum_stock);
      setValue('attributes', productDetails.attributes);
      setFileList([
        {
          uid: '-1',
          name: 'thumbnail',
          status: 'done',
          url: productDetails.thumbnail,
        },
      ]);
      setVariants(productDetails.variants);
      const images = productDetails.variants.map((variant, index) => ({
        [index]: variant.images.map((item, imgIndex) => ({
          uid: `${imgIndex}`,
          name: 'image',
          status: 'done',
          url: item,
        })),
      }));

      // Chuyển đổi mảng `images` thành đối tượng với key là index của variant
      const imagesObject = images.reduce((acc, curr) => {
        return { ...acc, ...curr };
      }, {});

      setUploadedImages(imagesObject);
    } else {
      reset({});
      setVariants([
        {
          index: 0,
          color: '',
          price: 0,
          stock: 0,
          discount: 0,
          images: [],
        },
      ]);
      setFileList([]);
      setUploadedImages([]);
    }
  }, [productDetails, setValue]);

  useEffect(() => {
    if (dataInformation?.attributes) {
      reset({
        ...getValues(),
        attributes: {},
      });
    } else {
      reset({});
    }
  }, [dataInformation?.attributes, reset, getValues]);

  const productActionProps = {
    categoryList,
    brandList,
    setCategoryId,
    variants,
    setVariants,
    watch,
    handleSaveProduct: handleSubmit(handleSaveProduct),
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
    dataInformation: dataInformation as TInformationResponse,
    showAttributeByCategory,
    productDetails: productDetails as TProductByIdResponse,
  };

  const mappedProductData: TProductTableProps[] | undefined =
    productData?.products.map((item: TProductItem) => ({
      key: item._id || '',
      name: item.name || '',
      category:
        categoryList?.find((cate) => cate._id === item.category_id)?.name || '',
      brand:
        brandList?.find((brand) => brand._id === item.brand_id)?.name || '',
      price: item.variants[0]?.price,
      discount: item.variants[0]?.discount || 0,
      thumbnail: item.thumbnail || '',
      rate: item.rate || 0,
      created_at: dayjs(item.created_at).format('DD-MM-YYYY'),
    }));
  return {
    mappedProductData,
    handleSearch,
    handleDelete,
    closeModalAdd,
    openModelAdd,
    openUpdateModal,
    isAddProductModalOpen,
    openViewModal,
    isView,
    productActionProps,
  };
};
