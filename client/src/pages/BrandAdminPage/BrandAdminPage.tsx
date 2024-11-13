import React from 'react';
import { useBrandAdminPage } from './useBrandAdminPage';
import TableBrand from './components/TableBrand';

const BrandAdminPage: React.FC = () => {
  const { handleQueryProps, handleTableProps } = useBrandAdminPage();

  if (!handleQueryProps.dataBrand) {
    return <h1>Loading...</h1>;
  }
  return (
    <TableBrand
      handleQueryProps={handleQueryProps}
      handleTableProps={handleTableProps}
    />
  );
};

export default BrandAdminPage;
