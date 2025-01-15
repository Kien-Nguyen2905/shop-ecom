import {
  Button,
  Collapse,
  Drawer,
  Input,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import { TDrawerWarehouseProps } from './tyings';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

const DrawerWarehouse: FC<TDrawerWarehouseProps> = ({
  handleClose,
  isOpen,
  warehouseDetail,
  isView,
  isImport,
  handleImport,
  control,
  shipmentColumns,
}) => {
  if (!warehouseDetail) return;

  return (
    <>
      <Drawer
        placement="right"
        size={'large'}
        onClose={handleClose}
        open={isOpen}
        extra={
          <Space>
            <Button onClick={handleClose} type="primary">
              Close
            </Button>
          </Space>
        }
      >
        <form>
          <div className="mb-4">
            <div className="hidden">
              <label>ID Product</label>
              <Controller
                name="product_id"
                control={control}
                defaultValue={warehouseDetail.product_id}
                render={({ field }) => (
                  <>
                    <Input {...field} readOnly />
                  </>
                )}
              />
            </div>
            <label>Product</label>
            <Controller
              name="product_name"
              control={control}
              defaultValue={warehouseDetail.product_name}
              render={({ field }) => (
                <>
                  <Input {...field} readOnly />
                </>
              )}
            />
          </div>
          <div className="mb-4">
            <div className="hidden">
              <label>ID Variant</label>
              <Controller
                name="variant_id"
                control={control}
                defaultValue={warehouseDetail.variant_id}
                render={({ field }) => (
                  <>
                    <Input {...field} readOnly />
                  </>
                )}
              />
            </div>
            <label>ID Variant</label>
            <Controller
              name="variant"
              control={control}
              defaultValue={warehouseDetail.variant}
              render={({ field }) => (
                <>
                  <Input {...field} readOnly />
                </>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-10">
            <div className="mb-4">
              <label>Sold</label>
              <Controller
                name="sold"
                control={control}
                defaultValue={warehouseDetail.sold}
                render={({ field, fieldState }) => (
                  <>
                    <Input {...field} readOnly />
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
              <label>Import</label>
              <Controller
                name="import_quantity"
                control={control}
                defaultValue={warehouseDetail.import_quantity}
                render={({ field, fieldState }) => (
                  <>
                    <Input {...field} readOnly />
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
              <label>Stock</label>
              <Controller
                name="stock"
                control={control}
                defaultValue={warehouseDetail.stock}
                render={({ field, fieldState }) => (
                  <>
                    <Input {...field} readOnly />
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
              <label>Minimum Stock</label>
              <Controller
                name="minimum_stock"
                control={control}
                defaultValue={warehouseDetail.minimum_stock}
                render={({ field, fieldState }) => (
                  <>
                    <Input {...field} readOnly />
                    {fieldState.error && (
                      <Typography.Text type="danger">
                        {fieldState.error.message}
                      </Typography.Text>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label>Status</label>
            <Tag
              className="w-[70px]"
              color={warehouseDetail.isDeleted ? 'red' : 'green'}
            >
              {warehouseDetail.isDeleted ? 'Deleted' : 'Active'}
            </Tag>
          </div>
          <div className="mb-4">
            <Collapse
              accordion={false}
              items={[
                {
                  key: '1',
                  label: 'Shipments',
                  children: (
                    <Table
                      bordered
                      columns={shipmentColumns}
                      dataSource={warehouseDetail?.shipments}
                      pagination={false}
                      rowKey="shipment_date"
                      size="small"
                    />
                  ),
                },
              ]}
            />
          </div>
          {isImport && (
            <div className="mb-4">
              <label>Import</label>
              <Controller
                name="quantity"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <Input {...field} />
                    {fieldState.error && (
                      <Typography.Text type="danger">
                        {fieldState.error.message}
                      </Typography.Text>
                    )}
                  </>
                )}
              />
            </div>
          )}
          {!isView && (
            <Space>
              <Button onClick={() => handleImport(isImport)} type="primary">
                Import
              </Button>
            </Space>
          )}
        </form>
      </Drawer>
    </>
  );
};

export default DrawerWarehouse;
