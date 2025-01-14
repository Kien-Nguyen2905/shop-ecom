import React from 'react';
import { useCategoryAdminPage } from './useCategoryAdminPage';
import { TableCategory } from './components';
import { SpinLoading } from '../../components';

const CategoryAdminPage: React.FC = () => {
  const { handleQueryProps, handleTableProps } = useCategoryAdminPage();

  if (!handleQueryProps.dataCategory) return <SpinLoading />;
  return (
    <div className="">
      <TableCategory
        handleQueryProps={handleQueryProps}
        handleTableProps={handleTableProps}
      />
    </div>
  );
};

export default CategoryAdminPage;
