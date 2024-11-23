import { useState } from 'react';
import {
  useUpdateWarehouseMutation,
  useWarehouse,
  useWarehouseByIdQuery,
} from '../../queries';
import { useProductAdminPage } from '../ProductAdminPage/useProductAdminPage';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_PATHS } from '../../constants';
import { useForm } from 'react-hook-form';
import { showToast } from '../../libs';

export const useWarehouseAdminPage = () => {
  const navigate = useNavigate();
  const { data: warehouseData } = useWarehouse();
  const importWarehouse = useUpdateWarehouseMutation();
  const { productData } = useProductAdminPage();
  const [isOpen, setIsOpen] = useState(false);
  const [isView, setIsView] = useState(false);

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const warehouseId = urlParams.get('warehouseId') || '';
  const { data: warehouseDetail } = useWarehouseByIdQuery(warehouseId);

  const [isImport, setIsImport] = useState(false);
  const { control, watch } = useForm();
  const shipmentColumns = [
    {
      title: 'Date',
      dataIndex: 'shipment_date',
      key: 'shipment_date',
      render: (text: string) => new Date(text).toLocaleString(), // Format the shipment date
    },
    {
      title: 'Import',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ];
  const handleClose = () => {
    setIsOpen(false);
    setIsView(false);
    setIsImport(false);
    navigate(ADMIN_PATHS.WAREHOUSE);
  };
  const handleImport = async (isImport: boolean = false) => {
    try {
      setIsImport(true);
      if (isImport) {
        const payload = {
          quantity: Number(watch('quantity')),
          variant_id: watch('variant_id'),
          product_id: watch('product_id'),
        };
        const res = await importWarehouse.mutateAsync({
          id: warehouseId,
          payload,
        });
        if (res.data.data._id) {
          handleClose();
          showToast({
            type: 'success',
            message: res.data.message,
          });
        }
      }
    } catch (error) {}
  };
  const openDrawer = async ({
    warehouseId,
    isView = false,
  }: {
    warehouseId: string;
    isView?: boolean;
  }) => {
    navigate(`?warehouseId=${warehouseId}`);
    if (isView) {
      setIsView(true);
    } else {
      setIsView(false);
    }
    setIsOpen(true);
  };
  return {
    warehouseData,
    productData,
    handleClose,
    isOpen,
    openDrawer,
    isView,
    warehouseDetail,
    isImport,
    handleImport,
    control,
    shipmentColumns,
  };
};