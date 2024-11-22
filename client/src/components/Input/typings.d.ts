export type TInputProps = {
  className?: string;
  lable?: string;
  required?: boolean;
  control?: any;
  name?: string;
  type?: string;
  rules?: RegisterOptions;
  variant?: string;
  onChange?: (value: string) => void;
};
