import React from 'react';
import { useController } from 'react-hook-form';
import { TInputProps } from './typings';
import { RULES } from '../../constants';

const Input: React.FC<TInputProps> = ({
  lable,
  required,
  onChange,
  control,
  name = '',
  type = 'text',
  variant = 'default',
  className = '',
  renderProp,
  ...props
}) => {
  // Render a normal input without using react-hook-form
  if (variant === 'normal') {
    return (
      <input
        type={type}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full py-2 px-3 border outline-none bg-transparent focus:border-primary ${className}`}
        {...props}
      />
    );
  }

  // Use react-hook-form for controlled inputs
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    control,
    name,
    rules: props.rules || RULES[name] || {}, // Fallback to an empty object if no rules exist
    defaultValue: '',
  });

  return renderProp ? (
    renderProp(props, invalid, field)
  ) : (
    <div className={`${className} flex flex-col w-full`}>
      {lable && (
        <label
          htmlFor={name}
          className="w-full mb-2 font-light text-textGrey font-PpLight"
        >
          {lable}
          {required ? ' *' : ''}
        </label>
      )}
      <input
        id={name}
        type={type}
        className={`w-full py-[8.5px] px-3 bg-bgInPut border outline-none focus:border-primary ${
          invalid ? 'border-red-600' : ''
        }`}
        {...field}
        {...props}
      />
      {invalid && <p className="text-sm text-red-600">{error?.message}</p>}
    </div>
  );
};

export default Input;
