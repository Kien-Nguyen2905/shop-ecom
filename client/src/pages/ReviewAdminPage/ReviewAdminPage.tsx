import { useReviewAdminPage } from './useReviewAdminPage';
import { Rate, Table } from 'antd';
import dayjs from 'dayjs';
import { TCreateReviewResponse } from '../../services/Review/tyings';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

const ReviewAdminPage = () => {
  const { reviewData } = useReviewAdminPage();
  const columns = [
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
