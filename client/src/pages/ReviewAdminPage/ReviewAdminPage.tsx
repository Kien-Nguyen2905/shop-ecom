import { useReviewAdminPage } from './useReviewAdminPage';
import { Rate, Select, Table } from 'antd';
import dayjs from 'dayjs';
import { TCreateReviewResponse } from '../../services/Review/tyings';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTransactionAdminPage } from '../TransactionAdminPage/useTransactionAdminPage';
const { Option } = Select;

const ReviewAdminPage = () => {
  const { reviewData } = useReviewAdminPage();
  const { userData } = useTransactionAdminPage();
  const emailFilters =
    userData?.map((user) => ({
      label: user.email,
      value: user.email,
    })) || [];

  const columns: any = [
    {
      title: 'Product',
      dataIndex: 'product',
      width: '15%',
      render: (record: TCreateReviewResponse['product']) => {
        return (
          <div className="flex items-center gap-2">
            <img className="w-[70px] h-[70px]" src={record?.image} alt="" />
            <div className="">
              <p>{record?.name}</p>
              <p>{record?.color}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Reviewer',
      dataIndex: 'reviewer',
      width: '15%',
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
      onFilter: (value: string, record: any) => {
        // Filter reviews by email
        const reviewerEmail = userData?.find(
          (item) => item?._id === record?.reviewer?.user_id,
        )?.email;
        return reviewerEmail === value;
      },
      render: (record: TCreateReviewResponse['reviewer']) => {
        return (
          <div>
            <p className="font-bold">{record?.full_name}</p>
            <p className="italic">{record?.email}</p>
          </div>
        );
      },
    },
    {
      title: 'Review',
      dataIndex: '_id',
      width: '15%',
      render: (_: any, record: TCreateReviewResponse) => {
        return (
          <div>
            <Rate value={record.rate} disabled />
            <p>{record?.title}</p>
            <p>{record?.description}</p>
          </div>
        );
      },
      sorter: (a: TCreateReviewResponse, b: TCreateReviewResponse) =>
        a.rate - b.rate,
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      width: '10%',
      sorter: (a: TCreateReviewResponse, b: TCreateReviewResponse) =>
        dayjs(a.created_at).isBefore(dayjs(b.created_at)) ? 1 : -1,
      render: (_: any, record: TCreateReviewResponse) => (
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
    <div className="pt-[100px]">
      <Table
        columns={columns}
        pagination={{ pageSize: 6 }}
        dataSource={reviewData}
      ></Table>
    </div>
  );
};

export default ReviewAdminPage;
