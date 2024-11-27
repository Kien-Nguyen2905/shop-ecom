import { FC } from 'react';
import { TCheckoutInforProps } from './tyings';
import Input from '../../../components/Input/Input';
import { Select } from 'antd';

const CheckoutInfor: FC<TCheckoutInforProps> = ({
  control,
  dataDistrict,
  dataProvince,
  dataWard,
  handleChangeDistrict,
  handleChangeProvince,
  handleChangeWard,
  handleSubmit,
  valueDistrict,
  valueProvince,
  valueWard,
}) => {
  return (
    <div className="h-full">
      <form
        action=""
        className="flex flex-col h-full gap-7"
        onSubmit={handleSubmit(() => {})}
      >
        <div className="flex gap-5">
          <Input
            name="full_name"
            lable="Full name"
            required
            control={control}
          ></Input>
          <Input
            name="email"
            lable="Email"
            disabled
            required
            control={control}
          ></Input>
          <Input name="phone" lable="Phone" required control={control}></Input>
        </div>
        <div className="flex gap-5">
          <Input
            name="province"
            control={control}
            required
            renderProp={(props, invalid, field) => (
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
                  className={`w-full custome-select py-[8.5px] px-3 bg-bgInPut border outline-none focus:border-primary ${
                    invalid ? 'border-red-600' : ''
                  }`}
                  onChange={(value) => {
                    field.onChange(value);
                    handleChangeProvince(value.toString());
                  }}
                />
              </div>
            )}
          />
          <Input
            name="district"
            control={control}
            required
            renderProp={(props, invalid, field) => (
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
                  className={`w-full custome-select py-[8.5px] px-3 bg-bgInPut border outline-none focus:border-primary ${
                    invalid ? 'border-red-600' : ''
                  }`}
                  onChange={(value) => {
                    field.onChange(value);
                    handleChangeDistrict(value);
                  }}
                />
              </div>
            )}
          />
          <Input
            name="ward"
            control={control}
            required
            renderProp={(props, invalid, field) => (
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
                  className={`w-full custome-select py-[8.5px] px-3 bg-bgInPut border outline-none focus:border-primary ${
                    invalid ? 'border-red-600' : ''
                  }`}
                  onChange={(value) => {
                    field.onChange(value);
                    handleChangeWard(value);
                  }}
                />
              </div>
            )}
          />
        </div>
        <Input
          name="street_address"
          lable="Street Address"
          required
          control={control}
        ></Input>
        <Input
          name="note"
          lable="Note"
          required
          control={control}
          renderProp={(props, invalid, field) => (
            <>
              <label>Order notes (optional)</label>
              <textarea
                className={`w-full py-[8.5px] px-3 bg-bgInPut border outline-none focus:border-primary ${
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
      </form>
    </div>
  );
};

export default CheckoutInfor;
