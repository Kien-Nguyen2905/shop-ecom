import { FC, useState } from 'react';
import { Card, Col, Rate, Row, Tabs, Pagination } from 'antd';
import type { TabsProps } from 'antd';
import { TDisplayProductTabsProps } from './tyings';
import dayjs from 'dayjs';
const DisplayProductTabs: FC<TDisplayProductTabsProps> = ({
  description,
  reviewData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const paginatedData = reviewData?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Description',
      children: <p>{description}</p>,
    },
    {
      key: '2',
      label: 'Review',
      children: (
        <div>
          {paginatedData?.map((review) => (
            <Card
              key={review._id}
              bordered={false}
              className="review-card"
              style={{ marginBottom: '20px' }}
            >
              <Row gutter={16}>
                <Col span={16} className="flex gap-[100px]">
                  <div>
                    <p className="reviewer-name">
                      <strong>{review?.user?.full_name}</strong>
                    </p>
                    <p>Color: {review.variant.color}</p>
                    <div className="flex gap-1">
                      <span>
                        {dayjs(review.created_at).format('DD-MM-YYYY')}
                      </span>
                      <span>|</span>
                      <span>{dayjs(review.created_at).format('HH:mm:ss')}</span>
                    </div>
                  </div>
                  <div>
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
