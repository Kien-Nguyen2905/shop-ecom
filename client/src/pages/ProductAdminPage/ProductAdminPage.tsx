import React, { useState } from 'react';
import { Table, Button, Input, Dropdown, Tag, Rate, Modal } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { ViewProduct, AddProduct } from './components';
import { useProductAdminPage } from './useProductAdminPage';
import { TProductItem } from '../../services/Product/tyings';
import { TProductTableProps } from './tying';

const ProductAdminPage: React.FC = () => {
  const {
    openModalView,
    closeModalView,
    isOpen,
    productData,
    categoryList,
    brandList,
    handleSearch,
    productDetails,
    handleDelete,
  } = useProductAdminPage();

  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);

  const mappedProductData: TProductTableProps[] | undefined =
    productData?.products.map((item: TProductItem, index: number) => ({
      key: item._id || '', // Unique key for the row
      name: item.name || '',
      category:
        categoryList?.find((cate) => cate._id === item.category_id)?.name || '', // Default category
      brand:
        brandList?.find((brand) => brand._id === item.brand_id)?.name || '', // Default to an empty string
      price: item.variants[index]?.price || 0, // Default price to 0
      color: item.variants[index]?.color || '', // Default color
      discount: item.variants[index]?.discount || 0, // Default discount to 0
      thumbnail: item.thumbnail || '', // Provide a placeholder thumbnail
      rate: item.rate || 0, // Default rate to 0
      created_at: dayjs(item.created_at).format('DD/MM/YYYY'), // Format created date
    }));

  const handleViewDetail = (record: TProductTableProps) => {
    openModalView(record.key);
  };

  const handleAddProduct = () => {
    setAddProductModalOpen(true); // Open the modal to add a new product
  };
  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      width: '20%',
      className: 'text-left font-medium',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      width: '10%',
      className: 'text-left',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: '10%',
      className: 'text-left',
    },
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      width: '15%',
      render: (url: string) => (
        <img src={url} alt="Thumbnail" className="w-[70px] h-[70px]" />
      ),
    },
    {
      title: 'Color',
      dataIndex: 'color',
      className: 'text-left',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '15%',
      className: 'text-left',
      render: (price: number) => `${price.toFixed(2)}`,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      width: '5%',
      className: 'text-left',
      render: (discount: number) => (
        <div className="flex flex-col gap-3">
          {/* <Switch value={discount} /> */}
          {discount !== undefined && <Tag color="gold">{discount * 100}%</Tag>}
        </div>
      ),
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      width: '15%',
      className: 'text-left',
      render: (rate: number) => (
        <Rate allowHalf style={{ fontSize: 10 }} disabled value={rate} />
      ),
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      width: '5%',
      className: 'text-left',
      render: (date: string) => date,
    },
    {
      title: 'Actions',
      width: '5%',
      render: (_: any, record: TProductTableProps) => {
        const handleDeleteConfirm = (record: TProductTableProps) => {
          Modal.confirm({
            title: 'Are you sure you want to delete this item?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete it',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => handleDelete(record.key),
          });
        };
        const menuItems = [
          {
            key: 'view',
            label: 'View Detail',
            onClick: () => handleViewDetail(record),
          },
          {
            key: 'update',
            label: 'Update',
            // onClick: () => handleUpdate(record),
          },
          {
            key: 'delete',
            label: 'Delete',
            danger: true,
            onClick: () => handleDeleteConfirm(record),
          },
        ];

        return (
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <Button type="text" icon={<EllipsisOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <AddProduct
        isOpen={isAddProductModalOpen}
        closeModalView={() => setAddProductModalOpen(false)} // Close modal function
        brandList={brandList!}
        categoryList={categoryList!}
      />

      <ViewProduct
        brandList={brandList!}
        categoryList={categoryList!}
        listData={productDetails!}
        closeModalView={closeModalView}
        isOpen={isOpen}
      />

      <div className="flex items-center justify-between gap-5 pb-5">
        <Input.Search
          placeholder="Search..."
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          className="w-[200px] ml-auto block"
        />
        <Button
          type="primary"
          onClick={handleAddProduct} // Open AddProduct Modal
        >
          Insert
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={mappedProductData}
        pagination={{ pageSize: 8 }}
        rowClassName={() => 'text-left'}
      />
    </div>
  );
};

export default ProductAdminPage;
