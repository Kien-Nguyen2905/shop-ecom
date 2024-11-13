import React from 'react';
import { useCategoryAdminPage } from './useCategoryAdminPage';
import { TableCategory } from './components';

const CategoryAdminPage: React.FC = () => {
  const { handleQueryProps, handleTableProps } = useCategoryAdminPage();

  if (!handleQueryProps.dataCategory) {
    return <h1>Loading...</h1>;
  }
  return (
    <TableCategory
      handleQueryProps={handleQueryProps}
      handleTableProps={handleTableProps}
    />
  );
};

export default CategoryAdminPage;
