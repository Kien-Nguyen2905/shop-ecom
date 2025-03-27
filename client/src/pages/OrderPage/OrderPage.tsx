import { Collapse, Card } from 'antd';
import { Link } from 'react-router-dom';
import { CUSTOMER_PATHS } from '../../constants';
import { ModalReview } from './components';
import { useOrderPage } from './useOrderPage';
import { formatCurrency, getLocationName } from '../../utils';
import dayjs from 'dayjs';
import { CalendarOutlined } from '@ant-design/icons';
import {
  STATUS_ORDER,
  STATUS_TRANSACTION,
  TYPE_PAYMENT,
} from '../../constants/enum';
import { IoTrashBinOutline } from 'react-icons/io5';
import { Button } from '../../components';
import { IoMdArrowForward } from 'react-icons/io';
const { Panel } = Collapse;

const OrderPage = () => {
  const {
    provinceData,
    districtData,
    wardData,
    orderInfo,
    modalProps,
    openModal,
    handleCancelOrder,
  } = useOrderPage();

  return (
    <div>
      {orderInfo && orderInfo.length > 0 ? (
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
                    <div className="flex items-center justify-between text-[12px] md:text-[14px]">
                      <span className="font-semibold">
                        Order ID: {order?._id?.slice(-5).toUpperCase()}
                      </span>
                      <div className="flex gap-2">
                        <span className="font-semibold">
                          {order?.transaction?.[0].status ===
                          STATUS_TRANSACTION.PENDING
                            ? 'Chưa thanh toán'
                            : order?.transaction?.[0].status ===
                              STATUS_TRANSACTION.FAILED
                            ? 'Thanh toán thất bại'
                            : 'Đã thanh toán'}
                        </span>
                        <span>|</span>
                        <span>
                          <CalendarOutlined style={{ marginRight: 4 }} />
                          {dayjs(order.created_at).format('DD-MM-YYYY')}
                        </span>
                      </div>
                    </div>
                  }
                >
                  <Card>
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
                        ? 'Accepted'
                        : order.status === 2
                        ? 'Canceled'
                        : 'Returned'}
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
                    <div className="flex gap-3 pt-5 ml-auto w-max">
                      {order?.transaction?.[0].status ===
                        STATUS_TRANSACTION.PENDING &&
                        order.status === STATUS_ORDER.PENDING && (
                          <>
                            <Button
                              variant="delete"
                              className="w-[107.59px]"
                              text="Cancel"
                              onClick={() =>
                                handleCancelOrder(order._id as string)
                              }
                            >
                              <IoTrashBinOutline size={20} />
                            </Button>
                          </>
                        )}
                      {order?.transaction?.[0].status ===
                        STATUS_TRANSACTION.PENDING &&
                        order?.type_payment === TYPE_PAYMENT.BANKING && (
                          <Link
                            to={CUSTOMER_PATHS.PAYMENT + '?order=' + order._id}
                          >
                            <Button text="Process">
                              <IoMdArrowForward size={20} />
                            </Button>
                          </Link>
                        )}
                    </div>
                  </Card>
                </Panel>
              );
            })}
          </Collapse>
        </>
      ) : (
        <div>Not exist order ...</div>
      )}

      <ModalReview {...modalProps!} />
    </div>
  );
};

export default OrderPage;
