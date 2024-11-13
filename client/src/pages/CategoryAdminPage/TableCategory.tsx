import React from 'react';
import { Table, Form, Typography, Popconfirm, Button, Input } from 'antd';
import { TCategoryResponse } from '../../services/Category/tyings';
import TableCell from './TableCell';
import dayjs from 'dayjs';
import { TEditableTableProps } from './tyings';
import { SearchOutlined } from '@ant-design/icons';

const TableCategory: React.FC<TEditableTableProps> = ({
  handleQueryProps,
  handleTableProps,
}) => {
  const { dataCategory, errors } = handleQueryProps;
  const {
    cancelRecord,
    deleteRecord,
    editRecord,
    insertRecord,
    saveRecord,
    isEditing,
    isInserting,
    editingKey,
    form,
  } = handleTableProps;

  const columns = [
    {
      title: 'Category',
      dataIndex: 'name',
      width: '35%',
      editable: true,
      // filterDropdown: ({
      //   setSelectedKeys,
      //   selectedKeys,
      //   confirm,
      //   clearFilters,
      // }: {
      //   setSelectedKeys: (selectedKeys: React.Key[]) => void;
      //   selectedKeys: React.Key[];
      //   confirm: () => void;
      //   clearFilters?: () => void;
      // }) => (
      //   <div className="p-[8px]">
      //     <Input
      //       placeholder="Search Category"
      //       value={selectedKeys[0]}
      //       onChange={(e) =>
      //         setSelectedKeys(e.target.value ? [e.target.value] : [])
      //       }
      //       onPressEnter={() => confirm()}
      //       style={{ width: 188, marginBottom: 8, display: 'block' }}
      //     />
      //     <div className="flex items-center gap-5">
      //       <Button
      //         type="primary"
      //         icon={<SearchOutlined />}
      //         onClick={() => confirm()}
      //         size="small"
      //         style={{ width: 90 }}
      //       >
      //         Search
      //       </Button>
      //       <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
      //         Reset
      //       </Button>
      //     </div>
      //   </div>
      // ),
      // onFilter: (value: any, record: any) =>
      //   record.name.toString().toLowerCase().includes(value.toLowerCase()),
      // sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      width: '25%',
      editable: false,
      sorter: (a: TCategoryResponse, b: TCategoryResponse) =>
        dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
      render: (created_at: string) =>
        dayjs(created_at).format('DD-MM-YYYY | HH:mm:ss'),
    },
    {
      title: 'Updated',
      dataIndex: 'updated_at',
      width: '25%',
      editable: false,
      sorter: (a: TCategoryResponse, b: TCategoryResponse) =>
        dayjs(a.updated_at).unix() - dayjs(b.updated_at).unix(),
      render: (updated_at: string) =>
        dayjs(updated_at).format('DD-MM-YYYY | HH:mm:ss'),
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_: any, record: TCategoryResponse) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="flex gap-5">
            <Typography.Link
              onClick={() => saveRecord(record._id, form)}
              style={{ marginInlineEnd: 8 }}
            >
              <span className="text-green-400">Save</span>
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancelRecord}>
              <span className="text-yellow-400 cursor-pointer">Cancel</span>
            </Popconfirm>
          </span>
        ) : (
          <div className="flex gap-5">
            <button
              className="text-blue-500"
              disabled={editingKey !== ''}
              onClick={() => editRecord(record)}
            >
              Edit
            </button>
            <button disabled={editingKey !== ''}>
              <Popconfirm
                className="text-red-500"
                title="Sure to delete?"
                onConfirm={() => deleteRecord(record)}
                okText="Yes"
                cancelText="No"
              >
                <a className="text-red-500">Delete</a>
              </Popconfirm>
            </button>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: TCategoryResponse) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        error: errors?.[record._id],
        errorText: errors?.[record._id],
      }),
    };
  });
  return (
    <Form form={form}>
      <div className="flex items-center gap-3 pb-[20px] w-max ml-auto">
        <Button
          onClick={insertRecord}
          type="primary"
          disabled={isInserting || editingKey !== ''}
        >
          Insert
        </Button>
      </div>

      <Table<TCategoryResponse>
        components={{
          body: { cell: TableCell },
        }}
        bordered
        dataSource={dataCategory}
        columns={mergedColumns}
        pagination={{ pageSize: 10, onChange: cancelRecord }}
        rowClassName="editable-row"
        rowKey="_id"
        showSorterTooltip={{ target: 'sorter-icon' }}
      />
    </Form>
  );
};

export default TableCategory;
