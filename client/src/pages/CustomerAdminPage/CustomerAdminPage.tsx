import { Table, Typography } from 'antd';
import React from 'react';
import { useCustomerAdminPage } from './useCustomerAdminPage';
import dayjs from 'dayjs';

const CustomerAdminPage = () => {
  const { userAllData } = useCustomerAdminPage();
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Points',
      dataIndex: 'earn_point',
      key: 'earn_point',
    },
    {
      title: 'Orders',
      dataIndex: 'total_order',
      key: 'total_order',
    },
    {
      title: 'Paid',
      dataIndex: 'total_paid',
      key: 'total_paid',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at: string) => dayjs(created_at).format('DD-MM-YYYY'),
    },
    {
      title: 'Action',
      render: () => (
        <>
          <Typography.Link style={{ marginInlineEnd: 8 }}>View</Typography.Link>
        </>
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
