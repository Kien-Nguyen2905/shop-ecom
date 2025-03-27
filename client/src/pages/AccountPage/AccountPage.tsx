import { Select } from 'antd';
import Input from '../../components/Input/Input';
import { useAccountPage } from './useAccountPage';
import { Button } from '../../components';

const AccountPage = () => {
  const {
    control,
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
    <form className="flex flex-col gap-7" onSubmit={handleUpdateProfile}>
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
      <div className="flex flex-col xl:flex-row gap-5">
        <Input
          name="province"
          control={control}
          required
          renderProp={(_, invalid, field, error) => (
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
          renderProp={(_, invalid, field, error) => (
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
          renderProp={(_, invalid, field, error) => (
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
                value={
                  !dataWard || dataWard.length === 0 ? '' : valueWard || null
                }
                options={dataWard}
                disabled={!dataWard || dataWard.length === 0}
                className={`w-full custom-select py-[8.5px] px-3 bg-bgInPut border outline-none focus:border-primary ${
                  invalid ? 'border-red-600' : ''
                }`}
                onChange={(value) => {
                  field?.onChange(value);
                  handleChangeWard(value);
                }}
              />
              {invalid && (
                <p className="text-sm text-red-600">{error?.message}</p>
              )}
            </div>
          )}
        />
      </div>
      <div className="flex gap-5">
        <Input
          name="street_address"
          label="Street Address"
          required
          control={control}
        ></Input>
      </div>
      <Button className="ml-auto" text="SAVE CHANGE"></Button>
    </form>
  );
};

export default AccountPage;
