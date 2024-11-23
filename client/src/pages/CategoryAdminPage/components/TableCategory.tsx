import React from 'react';
import {
  Table,
  Typography,
  Button,
  Input,
  Drawer,
  Tag,
  Dropdown,
  Modal,
} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { TEditableTableProps } from './tyings';
import { TCategoryResponse } from '../../../services/Category/tyings';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

const TableCategory: React.FC<TEditableTableProps> = ({
  handleQueryProps,
  handleTableProps,
}) => {
  const { dataCategory } = handleQueryProps;
  const {
    isView,
    setNewFieldName,
    setFieldValues,
    setSingleAttribute,
    setIsMultipleMode,
    isMultipleMode,
    singleAttribute,
    fieldValues,
    newFieldName,
    isOpen,
    openDrawer,
    closeDrawer,
    setAttributes,
    attributes,
    control,
    handleSubmit,
    handleAddAttribute,
    handleAddMultipleField,
    onSubmit,
    handleRemoveInput,
    handleDelete,
  } = handleTableProps;

  const columns = [
    {
      title: 'Category',
      dataIndex: 'name',
      width: '35%',
      editable: true,
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      width: '25%',
      editable: false,
      sorter: (a: TCategoryResponse, b: TCategoryResponse) =>
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
      sorter: (a: TCategoryResponse, b: TCategoryResponse) =>
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
      title: 'Actions',
      width: '10%',
      dataIndex: 'actions',
      render: (_: any, record: TCategoryResponse) => {
        const handleDeleteConfirm = () => {
          Modal.confirm({
            title: 'Are you sure you want to delete this category?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete it',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => handleDelete(record._id),
          });
        };

        const menuItems = [
          {
            key: 'view',
            label: 'View',
            onClick: () => openDrawer({ categoryId: record._id }),
          },
          {
            key: 'edit',
            label: 'Edit',
            onClick: () => openDrawer({ categoryId: record._id, isEdit: true }),
          },
          {
            key: 'delete',
            label: 'Delete',
            danger: true,
            onClick: handleDeleteConfirm,
          },
        ];

        return (
          <Dropdown
            menu={{ items: menuItems }}
            trigger={['click']}
            overlayStyle={{ minWidth: '150px' }}
          >
            <Button type="text" icon={<EllipsisOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 pb-[20px] w-max ml-auto">
        <Button onClick={() => openDrawer({})} type="primary">
          Insert
        </Button>
      </div>

      <Table
        dataSource={dataCategory}
        columns={columns}
        pagination={{ pageSize: 8 }}
      />

      <Drawer
        width={420}
        onClose={closeDrawer}
        open={isOpen}
        extra={
          <div>
            <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            {!isView && (
              <Button type="primary" onClick={handleSubmit(onSubmit)}>
                Save
              </Button>
            )}
          </div>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label>Category</label>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    readOnly={isView}
                    placeholder="Category Name"
                  />
                  {fieldState.error && (
                    <Typography.Text type="danger">
                      {fieldState.error.message}
                    </Typography.Text>
                  )}
                </>
              )}
            />
          </div>

          <div className="mb-4">
            <Typography.Text strong>Attributes</Typography.Text>
            <div className="flex flex-wrap gap-3 mt-2">
              {Object.entries(attributes).map(([key, value]) => (
                <Tag
                  key={key}
                  color="blue"
                  closable={!isView}
                  onClose={() => {
                    const updatedAttributes = { ...attributes };
                    delete updatedAttributes[key];
                    setAttributes(updatedAttributes);
                  }}
                >
                  {typeof value === 'string'
                    ? `${value}`
                    : `${key}: ${(value as Array<string>).join(', ')}`}
                </Tag>
              ))}
            </div>

            {!isView && (
              <Button
                type="dashed"
                onClick={() => setIsMultipleMode(!isMultipleMode)}
                className="mt-3"
              >
                {isMultipleMode
                  ? 'Switch to Normal Mode'
                  : 'Switch to Multiple Mode'}
              </Button>
            )}

            {!isView && (
              <>
                {!isMultipleMode ? (
                  <div className="mt-3">
                    <Input
                      value={singleAttribute}
                      onChange={(e) => setSingleAttribute(e.target.value)}
                      placeholder="Add new attribute"
                      style={{ width: '80%' }}
                    />
                    <Button
                      type="primary"
                      onClick={handleAddAttribute}
                      disabled={!singleAttribute}
                      style={{ marginLeft: '8px' }}
                    >
                      Add
                    </Button>
                  </div>
                ) : (
                  <div className="mt-3">
                    <Input
                      value={newFieldName}
                      onChange={(e) => setNewFieldName(e.target.value)}
                      placeholder="Field Name"
                      style={{ width: '80%' }}
                    />
                    {fieldValues.map((value: string, index: number) => (
                      <div className="flex items-center gap-5 pt-[10px]">
                        <Input
                          key={index}
                          value={value}
                          onChange={(e) => {
                            const updatedValues = [...fieldValues];
                            updatedValues[index] = e.target.value;
                            setFieldValues(updatedValues);
                          }}
                          placeholder={`Value ${index + 1}`}
                          style={{ width: '80%' }}
                        />
                        <Button onClick={() => handleRemoveInput(index)} danger>
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="dashed"
                      onClick={() => setFieldValues([...fieldValues, ''])}
                      className="mt-2"
                    >
                      Add Value
                    </Button>
                    <Button
                      type="primary"
                      onClick={handleAddMultipleField}
                      disabled={!newFieldName || fieldValues.length === 0}
                      className="mt-3"
                    >
                      Submit Multiple
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default TableCategory;
