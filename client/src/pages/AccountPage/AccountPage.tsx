import { Select } from 'antd';
import Input from '../../components/Input/Input';
import { useAccountPage } from './useAccountPage';
import { Button } from '../../components';

const AccountPage = () => {
  const {
    control,
    handleSubmit,
    valueProvince,
    dataProvince,
    handleChangeProvince,
    handleChangeDistrict,
    dataDistrict,
    valueDistrict,
    handleChangeWard,
    dataWard,
    valueWard,
    handleUpdateProfile,
  } = useAccountPage();
  return (
    <div className="">
      <form
        action=""
        className="flex flex-col gap-7"
        onSubmit={handleSubmit(handleUpdateProfile)}
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
        <div className="flex gap-5">
          <Input
            name="street_address"
            lable="Street Address"
            required
            control={control}
          ></Input>
        </div>
        <Button className="ml-auto" text="SAVE CHANGE"></Button>
      </form>
    </div>
  );
};

export default AccountPage;
