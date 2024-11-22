import { FC } from 'react';
import { TSelectProps } from './tyings';

const Select: FC<TSelectProps> = ({
  options,
  label,
  required,
  value,
  error,
  onChange,
  className = '',
  ...selectProps
}) => {
  return (
    <div className={className}>
      <label className="label" htmlFor="select">
        {label} {required && <span>*</span>}
      </label>
      <div className="select-custom">
        <select
          name="select"
          id="select"
          className={`form-control`}
          value={value}
          onChange={onChange}
          {...selectProps}
        >
          {options.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {!!error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Select;
