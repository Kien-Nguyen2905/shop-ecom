import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import { TEditableCellProps } from './tyings';

const TableCell: React.FC<TEditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  error,
  errorText,
}) => {
  const inputNode =
    inputType === 'number' ? <InputNumber autoFocus /> : <Input autoFocus />;
  return (
    <td>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please type input ${title}`,
            },
          ]}
          validateStatus={error ? 'error' : ''}
          help={error ? errorText : ''}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default TableCell;
