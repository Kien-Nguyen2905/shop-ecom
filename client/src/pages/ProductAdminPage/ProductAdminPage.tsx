import React from 'react';
import { Table, Button, Input, Dropdown, Tag, Rate, Modal } from 'antd';
import { EllipsisOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { ViewProduct, DrawerProduct } from './components';
import { useProductAdminPage } from './useProductAdminPage';
import { TProductItem } from '../../services/Product/tyings';
import { TProductTableProps } from './tying';
import { formatCurrency } from '../../utils';

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
    closeModalAdd,
    openModelAdd,
    openUpdateModal,
    isAddProductModalOpen,
  } = useProductAdminPage();

  const mappedProductData: TProductTableProps[] | undefined =
    productData?.products.map((item: TProductItem) => ({
      key: item._id || '', // Unique key for the row
      name: item.name || '',
      category:
        categoryList?.find((cate) => cate._id === item.category_id)?.name || '', // Default category
      brand:
        brandList?.find((brand) => brand._id === item.brand_id)?.name || '', // Default to an empty string
      price: item.variants[0]?.price,
      discount: item.variants[0]?.discount || 0, // Default discount to 0
      thumbnail: item.thumbnail || '', // Provide a placeholder thumbnail
      rate: item.rate || 0, // Default rate to 0
      created_at: dayjs(item.created_at).format('DD-MM-YYYY'), // Format created date
    }));
  const handleViewDetail = (record: TProductTableProps) => {
    openModalView(record.key);
  };

  const columns: any = [
    {
      title: 'Product',
      dataIndex: 'name',
      width: '15%',
      className: 'text-left font-medium',
      sorter: (a: TProductTableProps, b: TProductTableProps) =>
        a.name.localeCompare(b.name), // Sắp xếp theo tên sản phẩm
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      width: '10%',
      className: 'text-left',
      sorter: (a: TProductTableProps, b: TProductTableProps) =>
        a.brand.localeCompare(b.brand), // Sắp xếp theo brand
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: '10%',
      className: 'text-left',
      sorter: (a: TProductTableProps, b: TProductTableProps) =>
        a.category.localeCompare(b.category), // Sắp xếp theo category
    },
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      width: '10%',
      render: (url: string) => (
        <img src={url} alt="Thumbnail" className="w-[70px] h-[70px]" />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '15%',
      className: 'text-left',
      render: (price: number) => <p>{formatCurrency(price)}</p>,
      sorter: (a: TProductTableProps, b: TProductTableProps) =>
        a.price - b.price, // Sắp xếp theo price
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      width: '10%',
      className: 'text-left',
      render: (discount: number) => (
        <div className="flex flex-col gap-3">
          {discount !== undefined && <Tag color="gold">{discount * 100}%</Tag>}
        </div>
      ),
      sorter: (a: TProductTableProps, b: TProductTableProps) =>
        a.discount - b.discount, // Sắp xếp theo discount
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      width: '15%',
      className: 'text-left',
      render: (rate: number) => (
        <Rate allowHalf style={{ fontSize: 10 }} disabled value={rate} />
      ),
      sorter: (a: TProductTableProps, b: TProductTableProps) => a.rate - b.rate, // Sắp xếp theo rate
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      width: '15%',
      className: 'text-left',
      render: (text: string) => (
        <div className="flex">
          <CalendarOutlined style={{ marginRight: 4 }} />
          <div className="">{text}</div>
        </div>
      ),
      sorter: (a: TProductTableProps, b: TProductTableProps) =>
        dayjs(a.created_at).isBefore(b.created_at) ? -1 : 1, // Sắp xếp theo created_at
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
            label: 'View',
            onClick: () => handleViewDetail(record),
          },
          {
            key: 'Edit',
            label: 'Update',
            onClick: () => {
              openUpdateModal(record.key);
            },
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
    <div className="pt-[60px]">
      <DrawerProduct
        isOpen={isAddProductModalOpen}
        closeModalAdd={closeModalAdd}
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
          onClick={openModelAdd} // Open AddProduct Modal
        >
          Insert
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={mappedProductData}
        pagination={{ pageSize: 6 }}
        rowClassName={() => 'text-left'}
      />
    </div>
  );
};

export default ProductAdminPage;
