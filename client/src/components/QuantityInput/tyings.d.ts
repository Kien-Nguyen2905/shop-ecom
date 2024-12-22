export type TQuantityInputProps = {
  min?: number;
  max: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  isDisabled?: boolean;
  isBlur?: boolean;
};
