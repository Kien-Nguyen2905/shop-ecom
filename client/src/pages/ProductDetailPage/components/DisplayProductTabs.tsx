import { FC, useState } from 'react';
import { Card, Col, Rate, Row, Tabs, Pagination } from 'antd';
import type { TabsProps } from 'antd';
import { TDisplayProductTabsProps } from './tyings';
import dayjs from 'dayjs';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
const DisplayProductTabs: FC<TDisplayProductTabsProps> = ({
  description,
  reviewData,
}) => {
  // State to manage current page
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Paginate the data to show only the reviews for the current page
  const paginatedData = reviewData?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Description',
      children: <p className="">{description}</p>,
    },
    {
      key: '2',
      label: 'Review',
      children: (
        <div className="">
          {paginatedData?.map((review) => (
            <Card
              key={review._id}
              bordered={false}
              className="review-card"
              style={{ marginBottom: '20px' }}
            >
              <Row gutter={16}>
                <Col span={16} className="flex gap-[100px]">
                  <div className="">
                    <p className="reviewer-name">
                      <strong>{review.reviewer.full_name}</strong>
                    </p>
                    <div className="flex flex-col gap-1">
                      <span>
                        <CalendarOutlined style={{ marginRight: 4 }} />
                        {dayjs(review.created_at).format('DD-MM-YYYY')}
                      </span>
                      <span>
                        <ClockCircleOutlined style={{ marginRight: 4 }} />
                        {dayjs(review.created_at).format('HH:mm:ss')}
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <p className="review-title">{review.title}</p>
                    <p className="review-description">{review.description}</p>
                    <Rate disabled value={review.rate} />
                  </div>
                </Col>
              </Row>
            </Card>
          ))}
          {reviewData?.length > 0 && (
            <Pagination
              className="block ml-auto w-max"
              current={currentPage}
              pageSize={pageSize}
              total={reviewData?.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false} // Disable changing page size
              style={{ textAlign: 'center', marginTop: '20px' }}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full pt-10">
      <Tabs centered defaultActiveKey="1" items={items} />
    </div>
  );
};

export default DisplayProductTabs;
