import { FC } from 'react';
import { TCheckoutInforProps } from './tyings';
import Input from '../../../components/Input/Input';
import { Select } from 'antd';

const CheckoutInfo: FC<TCheckoutInforProps> = ({
  control,
  dataDistrict,
  dataProvince,
  dataWard,
  handleChangeDistrict,
  handleChangeProvince,
  handleChangeWard,
  valueDistrict,
  valueProvince,
  valueWard,
}) => {
  return (
    <div className="h-full">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col xl:flex-row gap-5">
          <Input
            name="full_name"
            label="Full name"
            required
            control={control}
          ></Input>
          <Input
            name="email"
            label="Email"
            disabled
            required
            control={control}
          ></Input>
          <Input name="phone" label="Phone" required control={control}></Input>
        </div>
        <div className="flex gap-5">
          <Input
            name="province"
            control={control}
            required
            renderProp={(props, invalid, field, error) => (
              <div className="flex flex-col w-full">
                <label>Province/City *</label>
                <Select
                  style={{
                    padding: 0,
                  }}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    ((option?.label as string) ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    ((optionA?.label as string) ?? '')
                      .toLowerCase()
                      .localeCompare(
                        ((optionB?.label as string) ?? '').toLowerCase(),
                      )
                  }
                  value={valueProvince || null}
                  options={dataProvince}
                  disabled={!dataProvince || dataProvince.length === 0}
                  className={`w-full custom-select py-[8.5px] px-3 bg-bgInPut border outline-none focus:border-primary ${
                    invalid ? 'border-red-600' : ''
                  }`}
                  onChange={(value) => {
                    field?.onChange(value);
                    handleChangeProvince(value.toString());
                  }}
                  {...props}
                />
                {invalid && (
                  <p className="text-sm text-red-600">{error?.message}</p>
                )}
              </div>
            )}
          />
          <Input
            name="district"
            control={control}
            required
            renderProp={(props, invalid, field, error) => (
              <div className="flex flex-col w-full">
                <label>District *</label>
                <Select
                  style={{
                    padding: 0,
                  }}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    ((option?.label as string) ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    ((optionA?.label as string) ?? '')
                      .toLowerCase()
                      .localeCompare(
                        ((optionB?.label as string) ?? '').toLowerCase(),
                      )
                  }
                  value={valueDistrict || null}
                  options={dataDistrict}
                  disabled={!dataDistrict || dataDistrict.length === 0}
                  className={`w-full custom-select py-[8.5px] px-3 bg-bgInPut border outline-none focus:border-primary ${
                    invalid ? 'border-red-600' : ''
                  }`}
                  onChange={(value) => {
                    field?.onChange(value);
                    handleChangeDistrict(value);
                  }}
                  {...props}
                />
                {invalid && (
                  <p className="text-sm text-red-600">{error?.message}</p>
                )}
              </div>
            )}
          />
          <Input
            name="ward"
            control={control}
            required
            renderProp={(props, invalid, field, error) => (
              <div className="flex flex-col w-full">
                <label>Ward *</label>
                <Select
                  style={{
                    padding: 0,
                  }}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    ((option?.label as string) ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    ((optionA?.label as string) ?? '')
                      .toLowerCase()
                      .localeCompare(
                        ((optionB?.label as string) ?? '').toLowerCase(),
                      )
                  }
                  value={valueWard || null}
                  options={dataWard}
                  disabled={!dataWard || dataWard.length === 0}
                  className={`w-full custom-select py-[8.5px] px-3 bg-bgInPut border outline-none focus:border-primary ${
                    invalid ? 'border-red-600' : ''
                  }`}
                  onChange={(value) => {
                    field?.onChange(value);
                    handleChangeWard(value);
                  }}
                  {...props}
                />
                {invalid && (
                  <p className="text-sm text-red-600">{error?.message}</p>
                )}
              </div>
            )}
          />
        </div>
        <Input
          name="street_address"
          label="Street Address"
          required
          control={control}
        ></Input>
        <Input
          name="note"
          label="Note"
          required
          control={control}
          renderProp={(props, invalid, field) => (
            <>
              <label>Order notes (optional)</label>
              <textarea
                className={`w-full resize-none py-[8.5px] px-3 bg-bgInPut border outline-none focus:border-primary ${
                  invalid ? 'border-red-600' : ''
                }`}
                cols={30}
                rows={4}
                {...props}
                {...field}
                placeholder="Notes about your order, e.g. special notes for delivery"
              />
            </>
          )}
        ></Input>
      </div>
    </div>
  );
};

export default CheckoutInfo;
