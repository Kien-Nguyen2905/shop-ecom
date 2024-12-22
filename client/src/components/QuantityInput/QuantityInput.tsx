import React, { FC, useState } from 'react';
import { TQuantityInputProps } from './tyings';
import { debounce } from 'lodash';

const QuantityInput: FC<TQuantityInputProps> = ({
  min = 1,
  max,
  step = 1,
  value,
  onChange,
  isDisabled,
  isBlur = false,
}) => {
  const [renderValue, setRenderValue] = useState(value || min);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setRenderValue(newValue);
    if (!isBlur) onChange?.(newValue);
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = modifyValue(Number(e.target.value));
    setRenderValue(value);
    onChange?.(value);
  };

  const onDecrease = debounce(() => {
    const value = modifyValue(renderValue - step);
    setRenderValue(value);
    onChange?.(value);
  }, 200);

  const onIncrease = debounce(() => {
    const value = modifyValue(renderValue + step);
    setRenderValue(value);
    onChange?.(value);
  }, 200);

  const modifyValue = (value: number) => {
    if (value > max) {
      return max;
    } else if (value < min) {
      return min;
    }
    return value;
  };

  return (
    <div className="flex items-center overflow-hidden border border-gray-300 rounded-md w-max">
      <button
        type="button"
        onClick={onDecrease}
        disabled={renderValue <= min}
        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        <span className="text-xl font-bold">−</span>
      </button>
      <input
        type="number"
        className="w-16 text-center outline-none appearance-none font-PpBold"
        onChange={onInputChange}
        onBlur={onInputBlur}
        value={renderValue.toString()?.replace(/^0+/, '')}
        max={max}
        min={min}
        disabled={isDisabled}
      />
      <button
        type="button"
        onClick={onIncrease}
        disabled={renderValue >= max}
        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        <span className="text-xl font-bold">+</span>
      </button>
    </div>
  );
};

export default QuantityInput;
