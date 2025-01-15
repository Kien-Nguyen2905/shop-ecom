import { useEffect, useState } from 'react';
import { handleError } from '../../libs';
import { transactionServices } from '../../services/Transaction';
import { TRevenue } from '../../services/Transaction/tyings';

export const useDashboardAdminPage = () => {
  const [revenueData, setRevenueData] = useState<TRevenue[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  const fetchRevenueData = async (year: number) => {
    try {
      const res = await transactionServices.getRevenue(year.toString());
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
