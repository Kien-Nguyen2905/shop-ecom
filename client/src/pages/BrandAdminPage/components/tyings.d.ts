import { FormInstance } from 'antd';
import { TBrandResponse } from '../../../services/Brand/tyings';

export type THandleQueryProps = {
  errors: Record<string, string>;
  dataBrand: TBrandResponse;
};
export type THandleTableProps = {
  form: FormInstance;
  editingKey: string;
  isInserting: boolean;
  isEditing: (record: TBrand) => boolean;
  editRecord: (record: TBrand) => void;
  cancelRecord: () => void;
  deleteRecord: (record: TBrand) => void;
  saveRecord: (key: string, form: any) => Promise<void>;
  insertRecord: () => void;
};
export type TEditableTableProps = {
  handleQueryProps: THandleQueryProps;
  handleTableProps: THandleTableProps;
};
export type TEditableCellProps = React.HTMLAttributes<HTMLElement> & {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  error?: boolean;
  errorText?: string;
};
export type TEditableTableProps = {
  handleQueryProps: THandleQueryProps;
  handleTableProps: THandleTableProps;
};
