import React from 'react';
import { Table, Card, Row, Col, Modal, Button } from 'antd';
import { TOrderDetailProps, TProductRecord } from './tyings';
import { formatCurrency } from '../../../utils';
import {
  useDistrictsQuery,
  useProvincesQuery,
  useWardsQuery,
} from '../../../queries';
import { STATUS_ORDER } from '../../../constants/enum';
const OrderDetail: React.FC<TOrderDetailProps> = ({
  isOpenModal,
  userDetail,
  orderDetail,
  closeModal,
  tableProductData,
  handleOrder,
}) => {
  if (!userDetail || !orderDetail) return null;
  const { data: provinceData } = useProvincesQuery();
  const { data: districtData } = useDistrictsQuery(
    orderDetail?.address?.province,
  );
  const { data: wardData } = useWardsQuery(orderDetail?.address?.district);
  const province = provinceData?.find(
    (item) => item.code.toString() === orderDetail?.address?.province,
  )?.name;
  const district = districtData?.find(
    (item) => item.code.toString() === orderDetail.address.district,
  )?.name;
  const ward = wardData?.find(
    (item) => item.code.toString() === orderDetail.address.ward,
  )?.name;

  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: TProductRecord) => (
        <div className="max-w-[180px] flex items-start gap-3">
          <img src={record.image} className="w-10 h-10" alt="" />
          <div className="flex flex-col items-start flex-1">
            <span className="text-[12px]">{name}</span>
            <span>{record.variant}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <span>{formatCurrency(price)}</span>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number) => <span>{quantity}</span>,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => <span>{formatCurrency(total)}</span>,
    },
  ];

  return (
    <Modal
      title="Order Details"
      open={isOpenModal}
      onCancel={closeModal}
      footer={null}
      width={1200}
    >
      <div className="flex gap-5">
        <div className="w-[670px]">
          <Table
            className="h-[500px] overflow-x-auto"
            columns={columns}
            dataSource={tableProductData}
            pagination={false}
            footer={() => (
              <Card title="Total">
                <div className="flex flex-col ml-auto w-max">
                  <div className="flex justify-between w-full">
                    <span className="text-gray-500">Total:</span>
                    <span className="font-semibold">
                      {formatCurrency(orderDetail.total)}
                    </span>
                  </div>
                  <div className="flex justify-between w-full pt-2 mt-4 border-t">
                    <span className="font-semibold">Quantity:</span>
                    <span className="text-lg font-bold text-blue-600">
                      {orderDetail.products.length}
                    </span>
                  </div>
                  <div className="flex justify-between w-full gap-1 pt-2 mt-4 border-t">
                    <p className="font-semibold">Payment:</p>
                    {orderDetail.type_payment === 1 ? (
                      <div className="flex items-center gap-2 text-gray-600">
                        BANKING
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-600">
                        COD
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}
          />
        </div>
        <div className="flex-1">
          <Row gutter={16}>
            <Col span={24}>
              <Card title="User Information" bordered={false}>
                <p>
                  <strong>Full Name:</strong> {userDetail.full_name}
                </p>
                <p>
                  <strong>Email:</strong> {userDetail.email}
                </p>
                <p>
                  <strong>Phone:</strong> {userDetail.phone}
                </p>
                <p>
                  <strong>Total Orders:</strong> {userDetail.total_order}
                </p>
                <p>
                  <strong>Total Paid:</strong>{' '}
                  {formatCurrency(userDetail.total_paid)}
                </p>
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Address" bordered={false}>
                <p>
                  <strong>Street:</strong> {orderDetail.address.street_address}
                </p>
                <p>
                  <strong>City/Province:</strong> {province}
                </p>
                <p>
                  <strong>District</strong> {district}
                </p>
                <p>
                  <strong>Ward</strong> {ward}
                </p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      {orderDetail.status === STATUS_ORDER.PENDING && (
        <div className="flex gap-5 ml-auto w-max">
          <div className="flex justify-end mt-5">
            <Button
              type="primary"
              onClick={() => {
                handleOrder({
                  order_id: orderDetail._id!,
                  status: STATUS_ORDER.ACCEPT,
                  user_id: orderDetail.user_id,
                });
              }}
            >
              Accept Order
            </Button>
          </div>
          <div className="flex justify-end mt-5">
            <Button
              danger
              onClick={() => {
                handleOrder({
                  order_id: orderDetail._id!,
                  status: STATUS_ORDER.CANCEL,
                  user_id: orderDetail.user_id,
                });
              }}
            >
              Cancel Order
            </Button>
          </div>
        </div>
      )}
      {orderDetail.status === STATUS_ORDER.ACCEPT && (
        <div className="flex gap-5 ml-auto w-max">
          <div className="flex justify-end mt-5">
            <Button
              type="primary"
              onClick={() => {
                handleOrder({
                  order_id: orderDetail._id!,
                  status: STATUS_ORDER.RETURN,
                  user_id: orderDetail.user_id,
                });
              }}
            >
              Return Order
            </Button>
          </div>
          <div className="flex justify-end mt-5">
            <Button
              danger
              onClick={() => {
                handleOrder({
                  order_id: orderDetail._id!,
                  status: STATUS_ORDER.CANCEL,
                  user_id: orderDetail.user_id,
                });
              }}
            >
              Cancel Order
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default OrderDetail;
