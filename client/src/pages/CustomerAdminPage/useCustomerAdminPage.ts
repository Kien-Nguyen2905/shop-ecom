import { useUserAllQuery } from '../../queries/useUser';

export const useCustomerAdminPage = () => {
  const { data: userAllData } = useUserAllQuery();
  return { userAllData };
};
