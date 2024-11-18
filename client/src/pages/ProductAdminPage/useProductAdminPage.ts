import { useState, useMemo } from 'react';
import {
  useBrandQuery,
  useCategoryQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useProductByIdQuery,
  useProductQuery,
} from '../../queries';
import { debounce } from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_PATHS } from '../../constants';
import { showToast } from '../../libs';
import { TCreateProductPayload } from '../../services/Product/tyings';

export const useProductAdminPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [queryString, setQueryString] = useState('');
  const { data: productData, isLoading } = useProductQuery(queryString);
  const categoryList = useCategoryQuery().data;
  const brandList = useBrandQuery().data;

  const deleteProduct = useDeleteProductMutation();
  const createProduct = useCreateProductMutation();

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const productId = urlParams.get('productId') || '';

  const { data: productDetails, isLoading: isProductLoading } =
    useProductByIdQuery(productId);
  // Preventing Re-creation of the Debounced Function
  const handleSearch = useMemo(
    () =>
      debounce((query: string) => {
        setQueryString(`search=${query}`);
        navigate(`?search=${query}`);
      }, 700),
    [], // Ensure the debounce function is memoized
  );
  const openModalView = (productId?: string) => {
    navigate(`?productId=${productId}` || '');
    setIsOpen(true);
  };

  const closeModalView = () => {
    setIsOpen(false);
    navigate(ADMIN_PATHS.PRODUCT);
  };

  const handleDelete = async (productId: string) => {
    try {
      const res = await deleteProduct.mutateAsync(productId);
      if (res.status === 200) {
        showToast({
          type: 'success',
          message: res?.data.message,
        });
        closeModalView();
      }
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error?.response?.data?.message,
      });
    }
  };

  const handleCreate = async (values: TCreateProductPayload) => {
    try {
      const res = await createProduct.mutateAsync(values);
      if (res.data.data._id) {
        showToast({
          type: 'success',
          message: res?.data.message,
        });
        closeModalView();
      }
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error?.response?.data?.message,
      });
    }
  };

  return {
    productData,
    openModalView,
    closeModalView,
    isOpen,
    isLoading,
    categoryList,
    brandList,
    handleSearch,
    productDetails,
    isProductLoading,
    handleDelete,
    handleCreate,
  };
};
