import { useTransactionAllQuery } from '../../queries/useTransaction';
import { useUserAllQuery } from '../../queries/useUser';

export const useTransactionAdminPage = () => {
  const { data: transactionData } = useTransactionAllQuery();
  const { data: userData } = useUserAllQuery();

  return {
    transactionData,
    userData,
  };
};
