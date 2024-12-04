export const getLocationName = (
  code: string | undefined,
  data: any[] | undefined,
): string => {
  if (!code || !data) return '';
  const location = data.find((item) => item.code.toString() === code);
  return location ? location.name : '';
};
