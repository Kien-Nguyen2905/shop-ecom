import { FC } from 'react';
import { Checkbox, Menu, Slider } from 'antd';
import { TFilterProductProps } from './tyings';
import { Button } from '../../../components';
import './FillterProduct.scss';
const FilterProduct: FC<TFilterProductProps> = ({
  categories,
  onCategoryChange,
  handlePriceChange,
  selectedFilters,
  handleCheckboxChange,
  setIsChecked,
  isChecked,
  priceRange,
  handleCleanAll,
  isXlScreen,
  onSale,
  popular,
  topRated,
}) => {
  const menuItems = categories?.map((item) => ({
    key: item._id,
    label: (
      <Checkbox
        checked={item._id === isChecked}
        onChange={() => {
          if (isChecked !== item._id) {
            setIsChecked(item._id);
          } else {
            setIsChecked('');
          }
          onCategoryChange('category', item._id);
        }}
      >
        {item.name}
      </Checkbox>
    ),
  }));

  return (
    <div className="w-full xl:w-[350px] p-4 border rounded shadow h-max flex flex-col justify-start gap-[5px]">
      <div className="flex items-center justify-between">
        <p>Filters</p>
        <Button
          className="px-[20px] py-[7px]"
          onClick={handleCleanAll}
          text="Clear all"
        />
      </div>
      <Menu
        className="category-product-select"
        style={{ width: 256 }}
        mode="inline"
        items={[
          {
            key: 'sub1',
            label: 'Category',
            children: menuItems,
          },
        ]}
        defaultOpenKeys={isXlScreen ? ['sub1'] : []}
      />
      <div className="mb-3">
        <h3 className="mb-3">Featured</h3>
        <div className="flex items-center justify-between">
          <Checkbox
            checked={selectedFilters?.popular || popular === 'true'}
            onChange={() => handleCheckboxChange('popular')}
          >
            Popular
          </Checkbox>
          <Checkbox
            checked={selectedFilters?.onSale || onSale === 'true'}
            onChange={() => handleCheckboxChange('onSale')}
          >
            Sale
          </Checkbox>
          <Checkbox
            checked={selectedFilters?.topRated || topRated === 'true'}
            onChange={() => handleCheckboxChange('topRated')}
          >
            Rate
          </Checkbox>
        </div>
      </div>
      <div>
        <p className="mb-3"> Price Range</p>
        <Slider
          range
          step={100}
          min={0}
          max={100000}
          value={priceRange}
          onChange={handlePriceChange}
          tooltip={{ formatter: (value) => `${value}` }}
          className="custom-slider"
        />
        <div className="flex justify-between mt-2 text-sm">
          <span>{priceRange?.[0]}</span>
          <span>{priceRange?.[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
