import { FC, useEffect, useState } from 'react';
import { Checkbox, Menu, Slider } from 'antd'; // Importing Ant Design Slider
import { TFilterProductProps } from './tyings';
import { Button } from '../../../components';
import { useLocation, useSearchParams } from 'react-router-dom';
const FilterProduct: FC<TFilterProductProps> = ({
  categories,
  onCategoryChange,
  onRangePriceChange,
  selectedFilters,
  handleCheckboxChange,
  setSelectedFilters,
  setSortValue,
}) => {
  const { search } = useLocation();
  const [_, setSearchParams] = useSearchParams();
  const [isChecked, setIsChecked] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 0]);

  const handleCleanAll = () => {
    setSortValue('newest');
    setPriceRange([0, 0]);
    setIsChecked('');
    setSearchParams({});
    setSelectedFilters({});
  };

  const handlePriceChange = (value: number[]) => {
    onRangePriceChange(value);
    setPriceRange(value);
  };
  const urlParams = new URLSearchParams(search);
  const onSale = urlParams.get('onSale');
  const popular = urlParams.get('popular');
  const topRated = urlParams.get('topRated');

  const getQueryParams = () => {
    const minPrice = urlParams.get('minPrice');
    const maxPrice = urlParams.get('maxPrice');
    const categoryId = urlParams.get('category');

    if (minPrice && maxPrice) {
      // Nếu có minPrice và maxPrice trong URL, thì thiết lập giá trị cho priceRange
      setPriceRange([parseInt(minPrice, 10), parseInt(maxPrice, 10)]);
    }
    if (categoryId) {
      setIsChecked(categoryId);
    }
  };

  useEffect(() => {
    getQueryParams(); // Gọi hàm lấy query params khi component mount hoặc search thay đổi
  }, [search]);
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

  const items = [
    {
      key: 'sub1',
      label: 'Category',
      children: menuItems,
    },
  ];

  return (
    <div className="max-w-[300px] h-max p-4 space-y-6 border rounded shadow">
      <div className="flex items-center justify-between">
        <p className="">Filters</p>
        <Button onClick={handleCleanAll} type text="Clear all"></Button>
      </div>
      <Menu
        className="w-full"
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
      <div className="">
        <h3 className="mb-2">Featured</h3>
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
        <p className="mb-2"> Price Range</p>
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
