export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat('vi-VN').format(number) + ' VND';
};
