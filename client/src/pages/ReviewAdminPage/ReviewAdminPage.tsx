import { Rate, Select, Table } from 'antd';
import dayjs from 'dayjs';
import { TCreateReviewResponse } from '../../services/Review/tyings';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useReviewQuery } from '../../queries';
import { useUserAllQuery } from '../../queries';
const { Option } = Select;

const ReviewAdminPage = () => {
  const { data: reviewData } = useReviewQuery();
  const { data: userData } = useUserAllQuery();
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
      render: (record: any) => {
        return (
          <div className="flex items-center gap-2">
            <img className="w-[70px] h-[70px]" src={record?.thumbnail} alt="" />
            <div>
              <p>{record?.name}</p>
              <p>{record?.color}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Reviewer',
      dataIndex: 'user',
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
        const reviewerEmail = userData?.find(
          (item) => item?._id === record?.reviewer?.user_id,
        )?.email;
        return reviewerEmail === value;
      },
      render: (record: any) => {
        return (
          <div>
            <p className="font-bold">{record?.full_name}</p>
            <p className="italic">{record?.phone}</p>
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
    <div>
      <Table
        columns={columns}
        pagination={{ pageSize: 6 }}
        dataSource={reviewData}
      ></Table>
    </div>
  );
};

export default ReviewAdminPage;
