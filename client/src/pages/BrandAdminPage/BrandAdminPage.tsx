import React from 'react';
import { useBrandAdminPage } from './useBrandAdminPage';
import TableBrand from './components/TableBrand';
import { SpinLoading } from '../../components';

const BrandAdminPage: React.FC = () => {
  const { handleQueryProps, handleTableProps } = useBrandAdminPage();
  if (!handleQueryProps.dataBrand) return <SpinLoading />;
  return (
    <div className="">
      <TableBrand
        handleQueryProps={handleQueryProps}
        handleTableProps={handleTableProps}
      />
    </div>
  );
};

export default BrandAdminPage;
