import { TCategoryResponse } from '../../../services/Category/tyings';

export type THandleQueryProps = {
  dataCategory: TCategoryResponse;
};

export type THandleTableProps = any;
export type TEditableTableProps = {
  handleQueryProps: THandleQueryProps;
  handleTableProps: THandleTableProps;
};
