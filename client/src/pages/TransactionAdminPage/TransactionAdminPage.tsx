import { Table, Select, Card, Row, Col, Tag } from 'antd';
import { useTransactionAdminPage } from './useTransactionAdminPage';
import dayjs from 'dayjs';
import { formatCurrency } from '../../utils';
import {
  BankOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MdOutlineLocalShipping, MdOutlineAttachMoney } from 'react-icons/md';
import { GrTransaction } from 'react-icons/gr';
import { GoCheckbox } from 'react-icons/go';
import { FaRegCalendarTimes } from 'react-icons/fa';

const { Option } = Select;

const TransactionAdminPage = () => {
  const {
    transactionData,
    userData,
    todayFailRevenue,
    todaySuccessRevenue,
    todaySuccessTransactions,
    todayFailedTransactions,
  } = useTransactionAdminPage();

  // Generate email filter options from userData
  const emailFilters =
    userData?.map((user) => ({
      label: user.email,
      value: user.email,
    })) || [];

  const columns: any = [
    {
      title: 'Transaction ID',
      dataIndex: '_id',
      key: '_id',
      sorter: (a: any, b: any) => a._id.localeCompare(b._id),
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
      title: 'Payment Type',
      dataIndex: 'type_payment',
      key: 'type_payment',
      filters: [
        { text: 'BANKING', value: 1 },
        { text: 'COD', value: 0 },
      ],
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
        { text: 'Successed', value: 0 },
        { text: 'Failed', value: 1 },
      ],
      filterMultiple: false,
      onFilter: (value: number, record: any) => record.status === value,
      render: (status: number) => {
        let color = '';
        let text = '';
        if (status === 0) {
          color = 'green';
          text = 'Successed';
        } else if (status === 1) {
          color = 'red';
          text = 'Failed';
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      sorter: (a: any, b: any) => a.value - b.value,
      render: (value: number) => <p>{formatCurrency(value)}</p>,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: (content: string) => <p>{content ? content : 'No content'}</p>,
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
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
  ];

  return (
    <div className="pt-[50px]">
      <Row gutter={16} className="pb-[30px]">
        <Col span={6}>
          <Card title="Total Successed Today" bordered={false}>
            <div className="flex items-center gap-3">
              <MdOutlineAttachMoney size={24} />
              <p>{formatCurrency(todaySuccessRevenue)}</p>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Failed Today" bordered={false}>
            <div className="flex items-center gap-3">
              <GrTransaction size={24} />
              <p>{formatCurrency(todayFailRevenue)}</p>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Successful  Today" bordered={false}>
            <div className="flex items-center gap-3">
              <GoCheckbox size={24} className="text-green-600" />
              <p>{todaySuccessTransactions}</p>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Failed  Today" bordered={false}>
            <div className="flex items-center gap-3">
              <FaRegCalendarTimes size={24} className="text-red-600" />
              <p>{todayFailedTransactions}</p>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Table section */}
      <Table
        columns={columns}
        dataSource={transactionData}
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
};

export default TransactionAdminPage;