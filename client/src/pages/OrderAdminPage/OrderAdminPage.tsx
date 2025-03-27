import { Button, Dropdown, Table, Tag, Select } from 'antd';
import { useOrderAdminPage } from './useOrderAdminPage';
import { formatCurrency } from '../../utils';
import dayjs from 'dayjs';
import {
  BankOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EllipsisOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { TOrderItem } from './tyings';
import { OrderDetail } from './components';
import { SpinLoading } from '../../components';
const { Option } = Select;
const OrderAdminPage = () => {
  const { orderData, userData, openModal, orderDetailProps } =
    useOrderAdminPage();
  if (!orderData) return <SpinLoading />;
  const emailFilters =
    userData?.map((user) => ({
      label: user.email,
      value: user.email,
    })) || [];

  const columns: any = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      sorter: (a: any, b: any) => a._id.localeCompare(b._id),
      render: (order: string) => <p>{order.slice(-5).toUpperCase()}</p>,
    },
    {
      title: 'Customer',
      dataIndex: 'user_id',
      key: 'user_id',
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: any) => (
        <div style={{ padding: 8 }}>
          <Select
            showSearch
            style={{ width: 200 }}
            value={selectedKeys[0]}
            placeholder="Select an email"
            onChange={(value) => {
              setSelectedKeys(value ? [value] : []);
              confirm();
            }}
            onBlur={clearFilters}
            allowClear
          >
            {emailFilters.map((email) => (
              <Option key={email.value} value={email.value}>
                {email.label}
              </Option>
            ))}
          </Select>
        </div>
      ),
      filterIcon: () => <UserOutlined />,
      onFilter: (value: string, record: any) =>
        userData?.find((item) => item?._id === record.user_id)?.email === value,
      render: (user_id: string, record: any) => {
        const user = userData?.find((item) => item?._id === user_id);
        return (
          <div>
            <p>{user?.full_name}</p>
            <p>{record?.phone}</p>
            <p>{user?.email}</p>
          </div>
        );
      },
    },
    {
      title: 'Total',
      dataIndex: 'total',
      render: (total: number) => <p>{formatCurrency(total)}</p>,
    },
    {
      title: 'Payment Type',
      dataIndex: 'type_payment',
      key: 'type_payment',
      filters: [
        { text: 'BANKING', value: 1 },
        { text: 'COD', value: 0 },
      ],
      filterMultiple: false,
      onFilter: (value: number, record: any) => record.type_payment === value,
      render: (type: number) => (
        <div>
          {type === 1 ? (
            <div className="flex items-center gap-2 ">
              <BankOutlined />
              BANKING
            </div>
          ) : (
            <div className="flex items-center gap-2 ">
              <MdOutlineLocalShipping size={17} />
              COD
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        { text: 'PENDING', value: 0 },
        { text: 'ACCEPTED', value: 1 },
        { text: 'CANCELED', value: 2 },
        { text: 'RETURNED', value: 3 },
      ],
      filterMultiple: false,
      onFilter: (value: number, record: any) => record.status === value,
      render: (status: number) => {
        let color = '';
        let text = '';
        if (status === 0) {
          color = 'yellow';
          text = 'PENDING';
        } else if (status === 1) {
          color = 'green';
          text = 'ACCEPTED';
        } else if (status === 2) {
          color = 'red';
          text = 'CANCELED';
        } else if (status === 3) {
          color = 'orange';
          text = 'RETURNED';
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      sorter: (a: any, b: any) =>
        dayjs(a.created_at).isBefore(dayjs(b.created_at)) ? 1 : -1,
      render: (_: any, record: any) => (
        <div className="flex flex-col gap-2">
          <span>
            <CalendarOutlined style={{ marginRight: 4 }} />
            {dayjs(record.created_at).format('DD-MM-YYYY')}
          </span>
          <span>
            <ClockCircleOutlined style={{ marginRight: 4 }} />
            {dayjs(record.created_at).format('HH:mm:ss')}
          </span>
        </div>
      ),
    },
    {
      title: 'Date Actions',
      dataIndex: 'updated_at',
      sorter: (a: any, b: any) =>
        dayjs(a.updated_at).isBefore(dayjs(b.updated_at)) ? 1 : -1,
      render: (_: any, record: any) => (
        <div className="flex flex-col gap-2">
          <span>
            <CalendarOutlined style={{ marginRight: 4 }} />
            {dayjs(record.updated_at).format('DD-MM-YYYY')}
          </span>
          <span>
            <ClockCircleOutlined style={{ marginRight: 4 }} />
            {dayjs(record.updated_at).format('HH:mm:ss')}
          </span>
        </div>
      ),
    },
    {
      title: 'Actions',
      render: (_: any, record: TOrderItem) => {
        const menuItems = [
          {
            key: 'view',
            label: 'View',
            onClick: () => openModal(record),
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
    <div>
      <Table
        columns={columns}
        dataSource={orderData}
        pagination={{ pageSize: 6 }}
      />
      <OrderDetail {...orderDetailProps} />
    </div>
  );
};

export default OrderAdminPage;
