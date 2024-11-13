import { FormInstance } from 'antd';
import {
  TCategoryPayload,
  TCategoryResponse,
  TUpdateCategoryPayload,
} from './../../services/Category/tyings.d';
export type THandleQueryProps = {
  errors: Record<string, string>;
  dataCategory: TCategoryResponse[];
};
export type THandleTableProps = {
  form: FormInstance;
  editingKey: string;
  isInserting: boolean;
  isEditing: (record: TCategoryResponse) => boolean;
  editRecord: (record: Partial<TCategoryResponse>) => void;
  cancelRecord: () => void;
  deleteRecord: (record: Partial<TCategoryResponse>) => void;
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
