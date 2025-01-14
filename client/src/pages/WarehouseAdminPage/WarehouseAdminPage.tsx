import { Button, Dropdown, Input, Table, Tag } from 'antd';
import { useWarehouseAdminPage } from './useWarehouseAdminPage';
import { SearchOutlined, EllipsisOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { DrawerWarehouse } from './components';
import { CalendarOutlined } from '@ant-design/icons';
import { SpinLoading } from '../../components';

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
  if (!warehouseData) return <SpinLoading />;
  const columns = [
    {
      title: 'Product',
      dataIndex: 'product_name',
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search product"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button
            type="link"
            size="small"
            onClick={() => clearFilters && clearFilters()}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value: any, record: any) =>
        record.product_name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Variant',
      dataIndex: 'variant',
      sorter: (a: any, b: any) => a.variant.localeCompare(b.variant),
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
      filterMultiple: false,
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
        <span>
          <CalendarOutlined style={{ marginRight: 4 }} />
          {dayjs(text).format('DD-MM-YYYY')}
        </span>
      ),
    },
    {
      title: 'Latest Import',
      dataIndex: 'updated_at',
      sorter: (a: any, b: any) =>
        dayjs(a.updated_at).isBefore(b.updated_at) ? -1 : 1,
      render: (text: string) => (
        <span>
          <CalendarOutlined style={{ marginRight: 4 }} />
          {dayjs(text).format('DD-MM-YYYY')}
        </span>
      ),
    },
    {
      title: 'Status',
      filters: [
        { text: 'Active', value: false },
        { text: 'Deleted', value: true },
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
            label: 'View',
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
    <div>
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
        pagination={{
          pageSize: 8,
          simple: false,
          showLessItems: true,
          showQuickJumper: false,
        }}
      />
    </div>
  );
};

export default WarehouseAdminPage;
