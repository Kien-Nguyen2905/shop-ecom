import React from 'react';
import { useCategoryAdminPage } from './useCategoryAdminPage';
import { TableCategory } from './components';

const CategoryAdminPage: React.FC = () => {
  const { handleQueryProps, handleTableProps } = useCategoryAdminPage();

  if (!handleQueryProps.dataCategory) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="pt-[60px]">
      <TableCategory
        handleQueryProps={handleQueryProps}
        handleTableProps={handleTableProps}
      />
    </div>
  );
};

export default CategoryAdminPage;
