import { useTransactionAllQuery } from '../../queries';
import { useUserAllQuery } from '../../queries';

export const useTransactionAdminPage = () => {
  const { data: transactionData } = useTransactionAllQuery();
  const { data: userData } = useUserAllQuery();

  return {
    transactionData,
    userData,
  };
};
