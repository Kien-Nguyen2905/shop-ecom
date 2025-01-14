import { Table, Button, Input, Dropdown, Tag, Rate, Modal } from 'antd';
import { EllipsisOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { DrawerProduct } from './components';
import { useProductAdminPage } from './useProductAdminPage';
import { TProductTableProps } from './tying';
import { formatCurrency } from '../../utils';
import { SpinLoading } from '../../components';

const ProductAdminPage = () => {
  const {
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
  } = useProductAdminPage();

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      width: '15%',
      className: 'text-left font-medium',
      sorter: (a: TProductTableProps, b: TProductTableProps) =>
        a.name.localeCompare(b.name),
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      width: '10%',
      className: 'text-left',
      sorter: (a: TProductTableProps, b: TProductTableProps) =>
        a.brand.localeCompare(b.brand),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: '10%',
      className: 'text-left',
      sorter: (a: TProductTableProps, b: TProductTableProps) =>
        a.category.localeCompare(b.category),
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
        a.price - b.price,
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
        a.discount - b.discount,
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      width: '15%',
      className: 'text-left',
      render: (rate: number) => (
        <Rate allowHalf style={{ fontSize: 10 }} disabled value={rate} />
      ),
      sorter: (a: TProductTableProps, b: TProductTableProps) => a.rate - b.rate,
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      width: '15%',
      className: 'text-left',
      render: (text: string) => (
        <div className="flex">
          <CalendarOutlined style={{ marginRight: 4 }} />
          <div>{text}</div>
        </div>
      ),
      sorter: (a: TProductTableProps, b: TProductTableProps) =>
        dayjs(a.created_at).isBefore(b.created_at) ? -1 : 1,
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
            onClick: () => openViewModal(record.key),
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

  if (!mappedProductData) return <SpinLoading />;
  return (
    <div className="">
      <DrawerProduct
        isView={isView}
        isOpen={isAddProductModalOpen}
        closeModalAdd={closeModalAdd}
        {...productActionProps}
      />
      <div className="flex items-center justify-between gap-5 pb-5">
        <Input.Search
          placeholder="Search..."
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          className="w-[200px] ml-auto block"
        />
        <Button type="primary" onClick={openModelAdd}>
          Insert
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={mappedProductData}
        pagination={{ pageSize: 6 }}
        rowClassName={() => 'text-left'}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default ProductAdminPage;
