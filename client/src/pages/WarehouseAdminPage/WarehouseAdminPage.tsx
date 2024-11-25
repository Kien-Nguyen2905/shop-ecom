import { Button, Dropdown, Table, Tag } from 'antd';
import { useWarehouseAdminPage } from './useWarehouseAdminPage';
import { EllipsisOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { DrawerWarehouse } from './components';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
const WarehouseAdminPage = () => {
  const {
    warehouseData,
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
      dataIndex: 'product_name',
    },
    {
      title: 'Variant',
      dataIndex: 'variant',
    },
    {
      title: 'Sold',
      dataIndex: 'sold',
      sorter: (a: any, b: any) => a.sold - b.sold,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      sorter: (a: any, b: any) => a.stock - b.stock,
    },
    {
      title: 'Min',
      dataIndex: 'minimum_stock',
      className: 'text-center',
      sorter: (a: any, b: any) => a.minimum_stock - b.minimum_stock,
    },
    {
      title: 'Restock',
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
      title: 'Import',
      dataIndex: 'created_at',
      sorter: (a: any, b: any) =>
        dayjs(a.created_at).isBefore(b.created_at) ? -1 : 1,
      render: (text: string) => (
        <div className="flex flex-col gap-2">
          <span>
            <CalendarOutlined style={{ marginRight: 4 }} />
            {dayjs(text).format('DD-MM-YYYY')}
          </span>
          <span>
            <ClockCircleOutlined style={{ marginRight: 4 }} />
            {dayjs(text).format('HH:mm:ss')}
          </span>
        </div>
      ),
    },
    {
      title: 'Latest Import',
      dataIndex: 'updated_at',
      sorter: (a: any, b: any) =>
        dayjs(a.updated_at).isBefore(b.updated_at) ? -1 : 1,
      render: (text: string) => (
        <div className="flex flex-col gap-2">
          <span>
            <CalendarOutlined style={{ marginRight: 4 }} />
            {dayjs(text).format('DD-MM-YYYY')}
          </span>
          <span>
            <ClockCircleOutlined style={{ marginRight: 4 }} />
            {dayjs(text).format('HH:mm:ss')}
          </span>
        </div>
      ),
    },
    {
      title: 'Status',
      filters: [
        { text: 'Active', value: false }, // isDeleted: false indicates active
        { text: 'Deleted', value: true }, // isDeleted: true indicates deleted
      ],
      filterMultiple: false,
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
          !record.isDeleted
            ? {
                key: 'import',
                label: 'Import',
                onClick: () => openDrawer({ warehouseId: record._id }),
              }
            : null,
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
        warehouseDetail={warehouseDetail!}
        handleClose={handleClose}
        isOpen={isOpen}
      />
      <Table
        columns={columns}
        dataSource={warehouseData}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default WarehouseAdminPage;
