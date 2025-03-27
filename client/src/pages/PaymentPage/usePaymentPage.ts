import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { transactionServices } from '../../services/Transaction';
import { CUSTOMER_PATHS } from '../../constants';
import { STATUS_TRANSACTION, TYPE_PAYMENT } from '../../constants/enum';
import { TTransactionResponse } from '../../services/Transaction/tyings';
import { message } from 'antd';

export const usePaymentPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [order, setOrder] = useState<TTransactionResponse>();
  const urlParams = new URLSearchParams(search);
  const orderId = urlParams.get('order');
  const orderIdRef = useRef(orderId);

  useEffect(() => {
    orderIdRef.current = orderId;
  }, [orderId]);

  const handleGetTransactionByOrder = async (orderId: string) => {
    try {
      const res = await transactionServices.getTransactionByOrder(orderId);
      setOrder(res.data.data);
      if (
        !res.data.data._id ||
        res.data.data.type_payment === TYPE_PAYMENT.COD ||
        res.data.data.status !== STATUS_TRANSACTION.PENDING
      ) {
        navigate(CUSTOMER_PATHS.ROOT);
      }
    } catch (error) {
      navigate(CUSTOMER_PATHS.ROOT);
    }
  };

  const handleCheckStatusTransaction = async () => {
    try {
      if (orderIdRef.current) {
        const res = await transactionServices.getTransactionByOrder(
          orderIdRef.current,
        );
        if (res.data.data.status === STATUS_TRANSACTION.SUCCESSED) {
          message.success('Order successfully');
          navigate(CUSTOMER_PATHS.CHECKOUT_SUCCESS);
        }
      }
    } catch (error) {
      navigate(CUSTOMER_PATHS.ROOT);
    }
  };

  useEffect(() => {
    if (orderId) {
      handleGetTransactionByOrder(orderId);

      const intervalId = setInterval(() => {
        handleCheckStatusTransaction();
      }, 3000);

      return () => clearInterval(intervalId);
    } else {
      navigate(CUSTOMER_PATHS.ROOT);
    }
  }, [orderId]);

  return { orderId, order, handleCheckStatusTransaction };
};
