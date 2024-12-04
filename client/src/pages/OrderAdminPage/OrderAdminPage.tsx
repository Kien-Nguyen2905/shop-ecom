import { Button, Dropdown, Table, Card, Row, Col, Tag, Select } from 'antd';
import { useOrderAdminPage } from './useOrderAdminPage';
import { formatCurrency } from '../../utils';
import dayjs from 'dayjs';
import {
  BankOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EllipsisOutlined,
  FileDoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { GoCheckbox } from 'react-icons/go';
import { TOrderItem } from './tyings';
import { OrderDetail } from './components';
import { useCustomerAdminPage } from '../CustomerAdminPage/useCustomerAdminPage';
const { Option } = Select;
const OrderAdminPage = () => {
  const {
    orderData,
    userData,
    totalOrders,
    todayOrders,
    totalRevenue,
    todayRevenue,
    openModal,
    orderDetailProps,
  } = useOrderAdminPage();
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
        { text: 'Pending', value: 0 },
        { text: 'Accepted', value: 1 },
      ],
      filterMultiple: false,
      onFilter: (value: number, record: any) => record.status === value,
      render: (status: number) => (
        <Tag color={status === 0 ? 'orange' : 'green'}>
          {status === 0 ? 'Pending' : 'Accepted'}
        </Tag>
      ),
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
      title: 'Actions',
      render: (_: any, record: TOrderItem) => {
        const menuItems = [
          {
            key: 'view',
            label: 'View Detail',
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
    <div className="pt-[50px]">
      <Row gutter={16} className="pb-[30px]">
        <Col span={6}>
          <Card title="Total Orders" bordered={false}>
            <div className="flex items-center gap-2">
              <GoCheckbox />
              <p>{totalOrders}</p>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Orders Today" bordered={false}>
            <div className="flex items-center gap-2">
              <FileDoneOutlined />
              <p>{todayOrders}</p>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Revenue" bordered={false}>
            <div className="flex items-center gap-2">
              <BankOutlined />
              <p>{formatCurrency(totalRevenue)}</p>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Revenue Today" bordered={false}>
            <div className="flex items-center gap-2">
              <CalendarOutlined />
              <p>{formatCurrency(todayRevenue)}</p>
            </div>
          </Card>
        </Col>
      </Row>
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
