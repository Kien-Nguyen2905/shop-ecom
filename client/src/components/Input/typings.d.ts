export type TInputProps = {
  className?: string;
  lable?: string;
  required?: boolean;
  control?: any;
  name?: string;
  type?: string;
  rules?: RegisterOptions;
  variant?: string;
  onChange?: any;
  disabled?: boolean;
  value?: string | number;
  checked?: boolean;
  defaultValue?: string | number;
  renderProp?: (
    props: Omit<TInputProps<T>, 'renderProp'>,
    invalid: boolean,
    field: {
      value: string;
      onChange: (...event: any[]) => void;
      onBlur: () => void;
    },
  ) => React.ReactNode; // Custom render function for advanced use cases
};
