import { FieldError } from 'react-hook-form';

export type TInputProps = {
  className?: string;
  classNameInput?: string;
  label?: string;
  required?: boolean;
  control?: any;
  name?: string;
  type?: string;
  rules?: RegisterOptions;
  defaultType?: boolean;
  onChange?: any;
  disabled?: boolean;
  value?: string | number;
  checked?: boolean;
  defaultValue?: string | number;
  placeholder?: string;
  renderProp?: (
    props?: Omit<TInputProps<T>, 'renderProp'>,
    invalid?: boolean,
    field?: {
      value: string;
      onChange: (...event: any[]) => void;
      onBlur: () => void;
    },
    error?: FieldError,
  ) => React.ReactNode;
};
