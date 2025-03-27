import { Select, Table } from 'antd';
import dayjs from 'dayjs';
import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { formatCurrency } from '../../utils';
import { CiPhone } from 'react-icons/ci';
import { useUserAllQuery } from '../../queries';
const { Option } = Select;

const CustomerAdminPage = () => {
  const { data: userAllData } = useUserAllQuery();

  const phoneFilters = userAllData?.map((user: any) => ({
    label: user.phone,
    value: user.phone,
  }));
  const emailFilters = userAllData?.map((user: any) => ({
    label: user.email,
    value: user.email,
  }));
  const columns = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
      sorter: (a: any, b: any) => a.full_name.localeCompare(b.full_name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
            {emailFilters?.map((email) => (
              <Option key={email.value} value={email.value}>
                {email.label}
              </Option>
            ))}
          </Select>
        </div>
      ),
      filterIcon: () => <UserOutlined />,
      onFilter: (value: any, record: any) => record.email.includes(value),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
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
            placeholder="Select a phone number"
            onChange={(value) => {
              setSelectedKeys(value ? [value] : []);
              confirm();
            }}
            onBlur={clearFilters}
            allowClear
          >
            {phoneFilters?.map((phone) => (
              <Option key={phone.value} value={phone.value}>
                {phone.label}
              </Option>
            ))}
          </Select>
        </div>
      ),
      filterIcon: () => <CiPhone />,
      onFilter: (value: any, record: any) => record.phone.includes(value),
    },
    {
      title: 'Points',
      dataIndex: 'earn_point',
      key: 'earn_point',
      sorter: (a: any, b: any) => a.earn_point - b.earn_point,
    },
    {
      title: 'Orders',
      dataIndex: 'total_order',
      key: 'total_order',
      sorter: (a: any, b: any) => a.total_order - b.total_order,
    },
    {
      title: 'Paid',
      dataIndex: 'total_paid',
      key: 'total_paid',
      render: (total_paid: number) => <p>{formatCurrency(total_paid)}</p>,
      sorter: (a: any, b: any) => a.total_paid - b.total_paid,
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a: any, b: any) =>
        dayjs(a.created_at).isBefore(b.created_at) ? -1 : 1,
      render: (text: string) => (
        <span>
          <CalendarOutlined style={{ marginRight: 4 }} />
          {dayjs(text).format('DD-MM-YYYY')}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={userAllData}
        pagination={{ pageSize: 8 }}
        rowClassName={() => 'text-left'}
      />
    </div>
  );
};

export default CustomerAdminPage;
