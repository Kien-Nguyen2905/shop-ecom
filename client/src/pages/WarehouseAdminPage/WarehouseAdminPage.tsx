import { Button, Dropdown, Table, Tag } from 'antd';
import { useWarehouseAdminPage } from './useWarehouseAdminPage';
import { EllipsisOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { DrawerWarehouse } from './components';

const WarehouseAdminPage = () => {
  const {
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
  } = useWarehouseAdminPage();

  const columns = [
    {
      title: 'Product',
      dataIndex: 'product_id',
      render: (_: any, record: any) => (
        <p>
          {
            productData?.products.find((item) => item._id === record.product_id)
              ?.name
          }
        </p>
      ),
    },
    {
      title: 'Variant',
      dataIndex: 'variant_id',
      key: 'variant_id',
      render: (_: any, record: any) => (
        <p>
          {productData?.products
            ?.find((product) =>
              product.variants.some(
                (variant) => variant._id === record.variant_id,
              ),
            )
            ?.variants.find((variant) => variant._id === record.variant_id)
            ?.color || 'N/A'}
        </p>
      ),
    },
    {
      title: 'Sold',
      dataIndex: 'sold',
      key: 'sold',
      sorter: (a: any, b: any) => a.sold - b.sold,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a: any, b: any) => a.stock - b.stock,
    },
    {
      title: 'Minimum',
      dataIndex: 'minimum_stock',
      key: 'minimum_stock',
      sorter: (a: any, b: any) => a.minimum_stock - b.minimum_stock,
    },
    {
      title: 'Restock',
      key: 'restock_status',
      filters: [
        { text: 'Restock', value: 'restock' },
        { text: 'Sufficient', value: 'sufficient' },
      ],
      filterMultiple: false, // Enable multi-select filtering
      onFilter: (value: any, record: any) => {
        if (value === 'restock') {
          return record.stock < record.minimum_stock;
        }
        if (value === 'sufficient') {
          return record.stock >= record.minimum_stock;
        }
        return true;
      },
      render: (_: any, record: any) => (
        <Tag color={record.stock < record.minimum_stock ? 'red' : 'green'}>
          {record.stock < record.minimum_stock ? 'Restock' : 'Sufficient'}
        </Tag>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a: any, b: any) =>
        dayjs(a.created_at).isBefore(b.created_at) ? -1 : 1,
      render: (text: string) => dayjs(text).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      title: 'Latest Import',
      dataIndex: 'updated_at',
      key: 'updated_at',
      sorter: (a: any, b: any) =>
        dayjs(a.updated_at).isBefore(b.updated_at) ? -1 : 1,
      render: (text: string) => dayjs(text).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      title: 'Status',
      key: 'isDeleted',
      filters: [
        { text: 'Active', value: false }, // isDeleted: false indicates active
        { text: 'Deleted', value: true }, // isDeleted: true indicates deleted
      ],
      filterMultiple: false, // Enable multi-select filtering
      onFilter: (value: any, record: any) => record.isDeleted === value,
      render: (_: any, record: any) => (
        <Tag color={record.isDeleted ? 'red' : 'green'}>
          {record.isDeleted ? 'Deleted' : 'Active'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      width: '5%',
      render: (_: any, record: any) => {
        const menuItems = [
          {
            key: 'view',
            label: 'View Detail',
            onClick: () =>
              openDrawer({ warehouseId: record._id, isView: true }),
          },
          {
            key: 'import',
            label: 'Import',
            onClick: () => openDrawer({ warehouseId: record._id }),
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
    <>
      <DrawerWarehouse
        shipmentColumns={shipmentColumns}
        isImport={isImport}
        control={control}
        handleImport={handleImport}
        isView={isView}
        productData={productData!}
        warehouseDetail={warehouseDetail!}
        handleClose={handleClose}
        isOpen={isOpen}
      />
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={warehouseData}
        bordered
        pagination={{ pageSize: 5 }}
        rowClassName={(record) => (record.isDeleted ? 'deleted-row' : '')}
      />
    </>
  );
};

export default WarehouseAdminPage;
