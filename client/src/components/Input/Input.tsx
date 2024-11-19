import React from 'react';
import { useController } from 'react-hook-form';
import { TInputProps } from './typings';
import { RULES } from '../../constants';

const Input: React.FC<TInputProps> = ({
  lable,
  required,
  control,
  name,
  type = 'text',
  className = '',
  ...props
}) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    control,
    name,
    rules: control.rules || RULES[name],
    defaultValue: '',
  });
  return (
    <div className={`${className} flex flex-col w-full`}>
      <label
        htmlFor=""
        className="w-full mb-2 font-light text-textGrey font-PpLight"
      >
        {lable}
        {required ? ' *' : ''}
      </label>
      <input
        type={type}
        className={`w-full py-[8.5px] px-3 bg-bgInPut border outline-none focus:border-primary ${
          invalid ? 'border-red-600' : ''
        }`}
        {...field}
        {...props}
      />
      {invalid && <p className="text-red-600">{error?.message}</p>}
    </div>
  );
};

export default Input;
