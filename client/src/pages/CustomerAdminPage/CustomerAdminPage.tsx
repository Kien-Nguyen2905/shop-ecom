import { Table, Typography } from 'antd';
import { useCustomerAdminPage } from './useCustomerAdminPage';
import dayjs from 'dayjs';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { formatCurrency } from '../../utils';

const CustomerAdminPage = () => {
  const { userAllData } = useCustomerAdminPage();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
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
    // {
    //   title: 'Action',
    //   render: () => (
    //     <>
    //       <Typography.Link style={{ marginInlineEnd: 8 }}>View</Typography.Link>
    //     </>
    //   ),
    // },
  ];

  return (
    <div className="pt-[100px]">
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
