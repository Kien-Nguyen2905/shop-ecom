import React from 'react';
import { Table, Form, Typography, Popconfirm, Button } from 'antd';
import TableCell from './TableCell';
import dayjs from 'dayjs';
import { TEditableTableProps } from './tyings';
import { TBrandResponse } from '../../../services/Brand/tyings';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
const TableBrand: React.FC<TEditableTableProps> = ({
  handleQueryProps,
  handleTableProps,
}) => {
  const { dataBrand, errors } = handleQueryProps;
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
      title: 'Brand',
      dataIndex: 'name',
      width: '35%',
      editable: true,
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      width: '25%',
      editable: false,
      sorter: (a: TBrandResponse, b: TBrandResponse) =>
        dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
      render: (text: string) => (
        <div className="flex gap-2">
          <span>
            <CalendarOutlined style={{ marginRight: 4 }} />
            {dayjs(text).format('DD-MM-YYYY')}
          </span>
          <span>
            <ClockCircleOutlined style={{ marginRight: 4 }} />
            {dayjs(text).format('HH:mm:ss')}
          </span>
        </div>
      ),
    },
    {
      title: 'Updated',
      dataIndex: 'updated_at',
      width: '25%',
      editable: false,
      sorter: (a: TBrandResponse, b: TBrandResponse) =>
        dayjs(a.updated_at).unix() - dayjs(b.updated_at).unix(),
      render: (text: string) => (
        <div className="flex gap-2">
          <span>
            <CalendarOutlined style={{ marginRight: 4 }} />
            {dayjs(text).format('DD-MM-YYYY')}
          </span>
          <span>
            <ClockCircleOutlined style={{ marginRight: 4 }} />
            {dayjs(text).format('HH:mm:ss')}
          </span>
        </div>
      ),
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_: any, record: TBrandResponse) => {
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
      onCell: (record: TBrandResponse) => ({
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

      <Table<TBrandResponse>
        components={{
          body: { cell: TableCell },
        }}
        dataSource={dataBrand}
        columns={mergedColumns}
        pagination={{ pageSize: 8, onChange: cancelRecord }}
        rowClassName="editable-row"
        rowKey="_id"
        showSorterTooltip={{ target: 'sorter-icon' }}
      />
    </Form>
  );
};

export default TableBrand;
