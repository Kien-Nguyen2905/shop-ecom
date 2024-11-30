import React from 'react';
import { useBrandAdminPage } from './useBrandAdminPage';
import TableBrand from './components/TableBrand';

const BrandAdminPage: React.FC = () => {
  const { handleQueryProps, handleTableProps } = useBrandAdminPage();

  if (!handleQueryProps.dataBrand) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="pt-[60px]">
      <TableBrand
        handleQueryProps={handleQueryProps}
        handleTableProps={handleTableProps}
      />
    </div>
  );
};

export default BrandAdminPage;
