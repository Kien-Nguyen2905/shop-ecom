import { Control, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { FormInstance } from 'antd';
import {
  TCategoryPayload,
  TCategoryResponse,
  TUpdateCategoryPayload,
} from '../../../services/Category/tyings';
export type THandleQueryProps = {
  dataCategory: TCategoryResponse[];
};
// export type THandleTableProps = {
//   control: Control<any>; // control from react-hook-form
//   handleSubmit: UseFormReturn<any>['handleSubmit']; // handleSubmit method from react-hook-form
//   reset: UseFormReturn<any>['reset']; // reset method from react-hook-form
//   watch: UseFormReturn<any>['watch']; // watch method from react-hook-form
//   editingKey: string; // key of the record being edited
//   isInserting: boolean; // indicates if a new record is being inserted
//   isEditing: (record: TCategoryResponse) => boolean; // function to check if a record is being edited
//   editRecord: (record: Partial<TCategoryResponse>) => void; // function to start editing a record
//   cancelRecord: () => void; // function to cancel editing
//   deleteRecord: (record: Partial<TCategoryResponse>) => void; // function to delete a record
//   saveRecord: (key: string, form: any) => Promise<void>; // function to save the edited record
//   handleCreate: (value: TCategoryPayload & { attributes: {} }) => void; // function to insert a new record
//   handleView: () => void;
// };

export type THandleTableProps = any;
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
