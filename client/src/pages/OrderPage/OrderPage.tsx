import { Collapse, Card } from 'antd';
import { Link } from 'react-router-dom';
import { CUSTOMER_PATHS } from '../../constants';
import { ModalReview } from './components';
import { useOrderPage } from './useOrderPage';
import { formatCurrency, getLocationName } from '../../utils';
import dayjs from 'dayjs';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import {
  useDistrictsQuery,
  useProvicesQuery,
  useWardsQuery,
} from '../../queries/useAddress';
const { Panel } = Collapse;

const OrderPage = () => {
  const { orderInfo, modalProps, openModal } = useOrderPage();
  const { data: provinceData } = useProvicesQuery();
  const { data: districtData } = useDistrictsQuery();
  const { data: wardData } = useWardsQuery();

  if (!orderInfo) return <div>Loading...</div>;

  return (
    <div>
      {orderInfo.length > 0 ? (
        <>
          <h2>Orders</h2>
          <Collapse accordion className="max-h-[420px] overflow-x-auto">
            {orderInfo.map((order) => {
              const province = getLocationName(
                order.address?.province,
                provinceData,
              );
              const district = getLocationName(
                order.address?.district,
                districtData,
              );
              const ward = getLocationName(order.address?.ward, wardData);

              return (
                <Panel
                  key={order._id!}
                  header={
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">
                        Order ID: {order._id}
                      </span>
                      <div className="flex gap-2">
                        <span>
                          <CalendarOutlined style={{ marginRight: 4 }} />
                          {dayjs(order.created_at).format('DD-MM-YYYY')}
                        </span>
                        <span>
                          <ClockCircleOutlined style={{ marginRight: 4 }} />
                          {dayjs(order.created_at).format('HH:mm:ss')}
                        </span>
                      </div>
                    </div>
                  }
                >
                  <Card>
                    <h4>Transaction ID: {order.transaction_id}</h4>
                    <p>
                      <strong>Total:</strong> {formatCurrency(order.total)}
                    </p>
                    <p>
                      <strong>Payment Type:</strong>{' '}
                      {order.type_payment === 1
                        ? 'Banking'
                        : 'Cash on Delivery'}
                    </p>
                    <p>
                      <strong>Status:</strong>{' '}
                      {order.status === 0
                        ? 'Pending'
                        : order.status === 1
                        ? 'Completed'
                        : 'Rejected'}
                    </p>
                    <p>
                      <strong>Address:</strong>{' '}
                      {order.address
                        ? `${order.address.street_address}, Ward: ${ward}, District: ${district}, Province: ${province}`
                        : 'Not Provided'}
                    </p>
                    <h4>Products:</h4>
                    <ul>
                      {order.products.map((product) => (
                        <li key={product.product_id} className="border-b">
                          <span>
                            {product.name} - {product.color} -{' '}
                            {product.quantity} x{' '}
                            {formatCurrency(
                              product.price * (1 - product.discount),
                            )}
                          </span>
                          <Link
                            to={
                              CUSTOMER_PATHS.PRODUCT +
                              `/${product.product_id}?variant=${product.variant_id}`
                            }
                            className="w-[50px] block h-[50px] mr-[10px]"
                          >
                            <img
                              src={product.image}
                              className="object-cover w-full h-full"
                              alt={product.name}
                            />
                          </Link>
                          {order.status === 1 ? (
                            product.isReviewed ? (
                              <Link
                                className="text-primary"
                                to={
                                  CUSTOMER_PATHS.PRODUCT +
                                  `/${product.product_id}?variant=${product.variant_id}`
                                }
                              >
                                Watch Review
                              </Link>
                            ) : (
                              <p
                                onClick={() =>
                                  openModal({
                                    order_id: order._id!,
                                    product_id: product.product_id,
                                    variant_id: product.variant_id,
                                  })
                                }
                                className="cursor-pointer text-primary"
                              >
                                Review
                              </p>
                            )
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Panel>
              );
            })}
          </Collapse>
        </>
      ) : (
        <div className="">Not exist order ...</div>
      )}

      <ModalReview {...modalProps!} />
    </div>
  );
};

export default OrderPage;
