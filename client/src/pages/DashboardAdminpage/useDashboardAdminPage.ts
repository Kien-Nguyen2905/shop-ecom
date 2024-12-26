import { useEffect, useState } from 'react';
import { TRevenueOrder } from '../../services/Order/tyings';
import { handleError } from '../../libs';
import orderServices from '../../services/Order/orderServices';

export const useDashboardAdminPage = () => {
  const [revenueData, setRevenueData] = useState<TRevenueOrder[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  const fetchRevenueData = async (year: number) => {
    try {
      const res = await orderServices.getRevenueOrder(year.toString());
      setRevenueData(res.data.data);
    } catch (error) {
      handleError({
        error,
      });
    }
  };

  useEffect(() => {
    fetchRevenueData(selectedYear);
  }, [selectedYear]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };
  return { handleYearChange, revenueData, selectedYear };
};
