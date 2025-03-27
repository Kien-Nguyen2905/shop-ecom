import React from 'react';
import { useController } from 'react-hook-form';
import { TInputProps } from './typings';
import { RULES } from '../../constants';

const Input: React.FC<TInputProps> = ({
  label,
  required,
  onChange,
  control,
  defaultType = false,
  name = '',
  type = 'text',
  className = '',
  classNameInput = '',
  renderProp,
  ...props
}) => {
  if (!defaultType) {
    const {
      field,
      fieldState: { invalid, error },
    } = useController({
      control,
      name,
      rules: props.rules || RULES[name] || {},
      defaultValue: '',
    });
    return renderProp ? (
      renderProp(props, invalid, field, error)
    ) : (
      <div className={`${className} flex flex-col w-full`}>
        {label && (
          <label
            htmlFor={name}
            className="w-full mb-2 font-light text-textGrey font-PpLight"
          >
            {label}
            {required ? ' *' : ''}
          </label>
        )}
        <input
          id={name}
          type={type}
          className={`${classNameInput} w-full text-darkGrey py-[8.5px] px-3 bg-bgInPut border outline-none focus:border-primary ${
            invalid ? 'border-red-600' : ''
          }`}
          {...field}
          {...props}
          onChange={(e) => {
            field.onChange(e);
            if (onChange) onChange(e.target.value);
          }}
        />
        {invalid && <p className="text-sm text-red-600">{error?.message}</p>}
      </div>
    );
  } else {
    return renderProp ? (
      renderProp()
    ) : (
      <div className={`${className} flex flex-col w-full`}>
        {label && (
          <label
            htmlFor={name}
            className="w-full mb-2 font-light text-textGrey font-PpLight"
          >
            {label}
            {required ? ' *' : ''}
          </label>
        )}
        <input
          id={name}
          type={type}
          className={`${classNameInput} w-full text-darkGrey py-[8.5px] px-3 bg-bgInPut border outline-none focus:border-primary
          `}
          {...props}
          onChange={(e) => {
            if (onChange) onChange(e.target.value);
          }}
        />
      </div>
    );
  }
};

export default Input;
