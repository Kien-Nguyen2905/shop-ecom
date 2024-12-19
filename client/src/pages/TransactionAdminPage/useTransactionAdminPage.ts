import dayjs from 'dayjs';
import { useTransactionAllQuery } from '../../queries/useTransaction';
import { useUserAllQuery } from '../../queries/useUser';

export const useTransactionAdminPage = () => {
  const { data: transactionData } = useTransactionAllQuery();
  const { data: userData } = useUserAllQuery();
  const today = dayjs().startOf('day');

  const todayFailRevenue =
    transactionData
      ?.filter(
        (transaction) =>
          transaction.status === 1 &&
          dayjs(transaction.created_at).isSame(today, 'day'),
      ) // Kiểm tra ngày
      .reduce((sum, transaction) => sum + transaction.value, 0) || 0;

  const todaySuccessRevenue =
    transactionData
      ?.filter(
        (transaction) =>
          transaction.status === 0 &&
          dayjs(transaction.created_at).isSame(today, 'day'),
      ) // Kiểm tra ngày
      .reduce((sum, transaction) => sum + transaction.value, 0) || 0;

  // Tổng số lượng giao dịch thành công hôm nay (status = 0)
  const todaySuccessTransactions =
    transactionData?.filter(
      (transaction) =>
        transaction.status === 0 &&
        dayjs(transaction.created_at).isSame(today, 'day'), // Kiểm tra ngày
    ).length || 0;

  // Tổng số lượng giao dịch thất bại hôm nay (status = 1)
  const todayFailedTransactions =
    transactionData?.filter(
      (transaction) =>
        transaction.status === 1 &&
        dayjs(transaction.created_at).isSame(today, 'day'), // Kiểm tra ngày
    ).length || 0;

  return {
    transactionData,
    userData,
    todayFailRevenue,
    todaySuccessRevenue,
    todaySuccessTransactions,
    todayFailedTransactions,
  };
};
