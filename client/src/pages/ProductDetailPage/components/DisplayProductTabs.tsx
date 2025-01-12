import { FC, useState } from 'react';
import { Card, Rate, Tabs, Pagination } from 'antd';
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
              <div className="flex gap-[20px] xl:gap-[100px]">
                <div className="w-max">
                  <p className="reviewer-name">
                    <strong>{review?.user?.full_name}</strong>
                  </p>
                  <p>Color: {review.variant.color}</p>
                  <div className="flex flex-col xl:flex-row">
                    <span>{dayjs(review.created_at).format('DD-MM-YYYY')}</span>
                    <span className="hidden xl:block">|</span>
                    <span>{dayjs(review.created_at).format('HH:mm:ss')}</span>
                  </div>
                </div>
                <div>
                  <p className="review-title">{review.title}</p>
                  <p className="review-description">{review.description}</p>
                  <Rate disabled value={review.rate} />
                </div>
              </div>
            </Card>
          ))}
          {reviewData?.length > 0 && (
            <Pagination
              className="block ml-auto w-max panigation-product-page"
              current={currentPage}
              pageSize={pageSize}
              total={reviewData?.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
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
