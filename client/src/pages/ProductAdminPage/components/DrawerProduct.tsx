import {
  Button,
  Drawer,
  Input,
  Space,
  Collapse,
  Table,
  Select,
  Upload,
  Checkbox,
} from 'antd';
import { FC, useEffect } from 'react';
import { FormValues, TAddProductProps } from './tyings';
import { Controller, FieldErrors } from 'react-hook-form';
import ImgCrop from 'antd-img-crop';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useAddProduct } from './hooks/useAddProduct';

const DrawerProduct: FC<TAddProductProps> = ({
  isOpen,
  closeModalAdd,
  brandList,
  categoryList,
}) => {
  const {
    productId,
    setCategoryId,
    variants,
    setVariants,
    watch,
    handleSubmit,
    handleSaveProduct,
    control,
    errors,
    onChange,
    onPreview,
    setValue,
    fileList,
    activeKey,
    handleCollapseChange,
    onChangeVariant,
    uploadedImages,
    handleRemoveVariant,
    handleAddVariant,
    dataInformation,
    showAttributeByCategory,
    productDetails,
  } = useAddProduct();

  const columns = [
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      render: (text: string, record: any) => (
        <Input
          value={text}
          onChange={(e) => {
            const newVariants = [...variants];
            newVariants[record.index].color = e.target.value;
            setVariants(newVariants);
          }}
        />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: number, record: any) => (
        <Input
          type="number"
          min={1}
          value={text}
          onKeyUp={(e) => {
            if (!/^\d$/.test(e.key)) {
              e.preventDefault(); // Ngăn chặn nhập ký tự không phải số
            }
          }}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^\d*$/.test(inputValue)) {
              // Kiểm tra chỉ chứa số hoặc rỗng
              const newVariants = [...variants];
              newVariants[record.index].price =
                inputValue === '' ? '' : Number(inputValue);
              setVariants(newVariants);
            }
          }}
        />
      ),
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (text: number, record: any) => (
        <Input
          value={text}
          disabled={productId ? true : false}
          min={1}
          type="number"
          onKeyUp={(e) => {
            // Ngăn nhập ký tự không phải số
            if (!/^\d$/.test(e.key)) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^\d*$/.test(inputValue)) {
              // Kiểm tra chỉ chứa số hoặc rỗng
              const newVariants = [...variants];
              newVariants[record.index].stock =
                inputValue === '' ? '' : Number(inputValue);
              setVariants(newVariants);
            }
          }}
        />
      ),
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      render: (text: number, record: any) => (
        <Input
          disabled={!watch('featured.onSale')}
          value={text * 100}
          min={0}
          max={100}
          type="number"
          onKeyUp={(e) => {
            if (!/^\d$/.test(e.key)) {
              e.preventDefault(); // Ngăn chặn nhập ký tự không phải số
            }
          }}
          onChange={(e) => {
            const value = Number(e.target.value); // Lấy giá trị nhập vào
            if (value >= 0 && value <= 100) {
              const newVariants = [...variants];
              newVariants[record.index].discount = value / 100; // Chuyển sang giá trị thập phân
              setVariants(newVariants);
            }
          }}
        />
      ),
    },
  ];
  useEffect(() => {
    if (!isOpen) {
      setCategoryId('');
    }
  }, [isOpen]);
  return (
    <Drawer
      size={'large'}
      onClose={() => {
        closeModalAdd();
      }}
      open={isOpen}
      extra={
        <div className="flex gap-5">
          <Button
            type="primary"
            onClick={handleSubmit((data) =>
              handleSaveProduct(data, closeModalAdd),
            )}
          >
            Save
          </Button>
          <Button onClick={closeModalAdd}>Close</Button>
        </div>
      }
    >
      <form>
        <div className="flex gap-10">
          <div className="flex-1">
            <div className="flex flex-col">
              <label>Product</label>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Please enter the product name' }}
                defaultValue={productDetails?.name}
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    placeholder="Enter product name"
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label>Category</label>
              <Controller
                name="category_id"
                control={control}
                rules={{ required: 'Please select a category' }}
                render={({ field }) => (
                  <Select
                    className="w-full"
                    {...field}
                    placeholder="Select category"
                    onChange={(value) => {
                      field.onChange(value); // Update the form value
                      showAttributeByCategory(value); // Trigger your custom logic
                    }}
                  >
                    {categoryList?.map((category: any) => (
                      <Select.Option key={category._id} value={category._id}>
                        {category.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
              {errors.category_id && (
                <p className="text-red-500">{errors.category_id.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label>Brand</label>
              <Controller
                name="brand_id"
                control={control}
                rules={{ required: 'Please select a brand' }}
                render={({ field }) => (
                  <Select {...field} placeholder="Select brand">
                    {brandList?.map((brand: any) => (
                      <Select.Option key={brand._id} value={brand._id}>
                        {brand.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
              {errors.brand_id && (
                <p className="text-red-500">{errors.brand_id.message}</p>
              )}
            </div>
          </div>
          <div className="">
            <Controller
              name="thumbnail"
              control={control}
              rules={{ required: 'Thumbnail is required' }}
              render={({ field }) => (
                <ImgCrop rotationSlider>
                  <Upload
                    {...field}
                    listType="picture-card"
                    onChange={onChange}
                    onPreview={onPreview}
                    beforeUpload={() => false}
                    style={{ width: '200px' }}
                    onRemove={() => {
                      field.onChange(undefined);
                      setValue('thumbnail', '');
                    }}
                    fileList={fileList}
                  >
                    {fileList.length < 1 && <IoCloudUploadOutline />}
                  </Upload>
                </ImgCrop>
              )}
            />
            {errors.thumbnail?.message &&
              typeof errors.thumbnail.message === 'string' && (
                <p className="text-red-500">{errors.thumbnail.message}</p>
              )}
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col">
            <label>Featured</label>
            <Controller
              name="featured"
              control={control}
              render={({ field }) => (
                <Space direction="vertical">
                  <Checkbox
                    checked={field.value?.isPopular || false}
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        isPopular: e.target.checked,
                      })
                    }
                  >
                    Popular
                  </Checkbox>
                  <Checkbox
                    checked={field.value?.onSale || false}
                    onChange={(e) => {
                      setValue('featured.onSale', e.target.checked);
                      field.onChange({
                        ...field.value,
                        onSale: e.target.checked,
                      });
                    }}
                  >
                    On Sale
                  </Checkbox>
                </Space>
              )}
            />
          </div>
          <div className="flex flex-col ">
            <label>Minimum stock</label>
            <Controller
              name="minimum_stock"
              control={control}
              rules={{
                required: 'Please enter minimum stock',
                validate: (value) =>
                  value > 0 || 'Minimum stock must be greater than 0',
              }}
              render={({ field }) => (
                <Input className="w-[100px]" min={1} {...field} type="number" />
              )}
            />
            {errors.minimum_stock && (
              <p className="text-red-500">{errors.minimum_stock.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-[20px]">
          <label>Description</label>
          <Controller
            name="description"
            control={control}
            rules={{
              required: 'Description is required',
            }}
            render={({ field }) => (
              <Input.TextArea {...field} rows={4} placeholder="Description" />
            )}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        {dataInformation?.category_id === watch('category_id') && (
          <div>
            {Object.entries(dataInformation?.attributes || {})?.map(
              ([key, value]) => (
                <div key={key} className="mb-4">
                  <label className="capitalize">
                    {typeof value === 'string' ? value : key}
                  </label>
                  {Array.isArray(value) ? (
                    // Render as Select if the value is an array
                    <>
                      <Controller
                        name={`attributes.${key}`}
                        control={control}
                        rules={{
                          required: 'Please choose attribute value',
                        }}
                        render={({ field }) => {
                          const fieldValue = Array.isArray(field.value)
                            ? field.value
                            : []; // Đảm bảo giá trị là mảng
                          return (
                            <Checkbox.Group
                              className="w-full"
                              {...field}
                              value={fieldValue} // Truyền giá trị đã đảm bảo là mảng
                              options={value.map((option: string) => ({
                                label: option,
                                value: option,
                              }))}
                            />
                          );
                        }}
                      />
                      {(errors as FieldErrors<FormValues>)['attributes']?.[
                        key
                      ] && (
                        <p className="text-red-500">
                          {
                            (errors as FieldErrors<FormValues>)['attributes']?.[
                              key
                            ]?.message
                          }
                        </p>
                      )}
                    </>
                  ) : (
                    // Render as Input for string or other types
                    <>
                      <Controller
                        name={`attributes.${key}`}
                        control={control}
                        rules={{
                          required: 'Please type attribute value',
                        }}
                        render={({ field }) => <Input {...field} />}
                      />
                      {(errors as FieldErrors<FormValues>)['attributes']?.[
                        key
                      ] && (
                        <p className="text-red-500">
                          {
                            (errors as FieldErrors<FormValues>)['attributes']?.[
                              key
                            ]?.message
                          }
                        </p>
                      )}
                    </>
                  )}
                </div>
              ),
            )}
          </div>
        )}
        <div className="pt-[20px]">
          <label className="block">Variants</label>
          <Controller
            name="variants"
            control={control}
            render={({ field }) => (
              <>
                <Collapse
                  {...field}
                  activeKey={activeKey}
                  onChange={handleCollapseChange}
                  items={variants?.map((variant: any) => ({
                    key: String(variant.index),
                    label: `Variant ${variant.index + 1}`,
                    children: (
                      <Table
                        dataSource={[variant]}
                        columns={columns}
                        pagination={false}
                        footer={() => (
                          <div className="flex flex-col gap-10">
                            <ImgCrop rotationSlider>
                              <Upload
                                listType="picture-card"
                                onChange={(info) =>
                                  onChangeVariant(info, variant.index)
                                }
                                onPreview={onPreview}
                                beforeUpload={() => false}
                                onRemove={() => {
                                  uploadedImages[variant.index].filter(
                                    (_, idx) => idx !== 0,
                                  );
                                }}
                                fileList={uploadedImages[variant.index]}
                              >
                                {/* Kiểm tra điều kiện nếu uploadedImages[variant.index] chưa có ảnh hoặc ít hơn 3 ảnh */}
                                {(uploadedImages[variant?.index]?.length ?? 0) <
                                  3 && <IoCloudUploadOutline />}
                              </Upload>
                            </ImgCrop>
                            <Space>
                              <Button
                                onClick={() =>
                                  handleRemoveVariant(variant.index)
                                }
                                danger
                              >
                                Remove Variant
                              </Button>
                              <Button onClick={handleAddVariant}>
                                Add Variant
                              </Button>
                            </Space>
                          </div>
                        )}
                      />
                    ),
                  }))}
                />
                {errors.variants && (
                  <p className="text-red-500">{errors.variants.message}</p>
                )}
              </>
            )}
          />
        </div>
      </form>
    </Drawer>
  );
};

export default DrawerProduct;