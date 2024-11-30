import {
  Button,
  Drawer,
  Input,
  Space,
  Form,
  Collapse,
  Table,
  Rate,
  Switch,
  Select,
} from 'antd';
import { FC, useState } from 'react';
import { TViewProductProps } from './tyings';

const ViewProduct: FC<TViewProductProps> = ({
  isOpen,
  closeModalView,
  listData,
  brandList,
  categoryList,
}) => {
  const [activeKey, setActiveKey] = useState<string[]>([]); // Quản lý key của các panel mở

  if (!listData) return null;

  // Hàm để xử lý thay đổi trạng thái mở/đóng các panel
  const handleCollapseChange = (key: string | string[]) => {
    // Do mở nhiều collapse cùng lúc nên dùng array
    setActiveKey(Array.isArray(key) ? key : [key]);
  };

  // Cấu hình cột cho Table
  const columns = [
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      render: (text: any) => (text ? `${text * 100}%` : 'N/A'),
    },
  ];

  return (
    <Drawer
      placement="right"
      size={'large'}
      onClose={closeModalView}
      open={isOpen}
      extra={
        <Space>
          <Button type="primary" onClick={closeModalView}>
            Close
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" initialValues={listData}>
        <div className="flex gap-10">
          <div className="flex-1">
            <Form.Item label="Product Name" name="name">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Category" name="category_id">
              <Select disabled defaultValue={listData?.category_id}>
                {categoryList?.map((category) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Brand" name="brand_id">
              <Select disabled defaultValue={listData?.brand_id}>
                {brandList?.map((brand) => (
                  <Select.Option key={brand._id} value={brand._id}>
                    {brand.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <img
            src={listData?.thumbnail}
            alt="Thumbnail"
            className="w-[300px] h-[250px]"
          />
        </div>

        <Form.Item label="Description" name="description">
          <Input.TextArea
            readOnly
            style={{ resize: 'none' }}
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>

        <div className="flex gap-10">
          <Form.Item label="Popular">
            <Switch disabled value={listData?.featured?.isPopular} />
          </Form.Item>
          <Form.Item label="Discount">
            <Switch disabled value={listData?.featured?.onSale} />
          </Form.Item>
          <Form.Item label="Rate" name="rate">
            <Rate allowHalf disabled />
          </Form.Item>
        </div>

        {/* Collapse for Variants */}
        <Form.Item label="Variants" name="variants">
          <Collapse
            activeKey={activeKey}
            onChange={handleCollapseChange} // Mở nhiều panel cùng lúc
            items={listData?.variants?.map((variant, index) => ({
              key: index.toString(),
              label: `Variant ${index + 1}: ${variant?.color}`,
              extra: <span>Price: {variant?.price}</span>,
              children: (
                <>
                  <Table
                    bordered
                    columns={columns}
                    dataSource={[variant]} // Truyền mỗi variant như một item trong dataSource
                    pagination={false} // Tắt phân trang nếu không cần
                    rowKey="color" // Dùng color làm key cho mỗi hàng
                    size="small"
                  />
                  <div className="h-[150px] w-full flex my-10 gap-10">
                    {variant.images.map((item) => (
                      <img
                        src={item}
                        className="object-cover w-full h-full"
                        alt=""
                      />
                    ))}
                  </div>
                </>
              ),
            }))}
          ></Collapse>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default ViewProduct;
