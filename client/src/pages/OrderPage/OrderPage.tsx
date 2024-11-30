import { Collapse, Card } from 'antd';
import { Link } from 'react-router-dom';
import { CUSTOMER_PATHS } from '../../constants';
import { ModalReview } from './components';
import { useOrderPage } from './useOrderPage';
import { formatCurrency } from '../../utils';

const { Panel } = Collapse;

const OrderPage = () => {
  const { orderInfo, modalProps, openModal } = useOrderPage();
  if (!orderInfo) return;
  return (
    <div>
      <h2>Orders</h2>
      <Collapse accordion className="max-h-[420px] overflow-x-auto ">
        {orderInfo?.map((order) => (
          <>
            <Panel key={order._id!} header={`Order ID: ${order._id}`}>
              <Card>
                <h4>Transaction ID: {order.transaction_id}</h4>
                <p>
                  <strong>Total:</strong> {formatCurrency(order.total)}
                </p>
                <p>
                  <strong>Payment Type:</strong>{' '}
                  {order.type_payment === 1 ? 'Banking' : 'Cash on Delivery'}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  {order.status === 0 ? 'Pending' : 'Completed'}
                </p>
                <p>
                  <strong>Address:</strong>{' '}
                  {order.address
                    ? `${order.address.street_address}, Ward: ${order.address.ward}, District: ${order.address.district}, Province: ${order.address.province}`
                    : 'Not Provided'}
                </p>
                <h4>Products:</h4>
                <ul>
                  {order.products.map((product) => (
                    <li key={product.product_id} className="border-b">
                      <span>
                        {product.name} - {product.color} - {product.quantity} x{' '}
                        {formatCurrency(product.price * (1 - product.discount))}
                      </span>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: 50, height: 50, marginRight: 10 }}
                      />
                      {product.isReviewed ? (
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
                      )}
                    </li>
                  ))}
                </ul>
              </Card>
            </Panel>
          </>
        ))}
      </Collapse>
      <ModalReview {...modalProps!} />
    </div>
  );
};

export default OrderPage;
