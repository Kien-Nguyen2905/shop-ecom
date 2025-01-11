import React from 'react';

export type TButtonProps = {
  onClick?: () => void;
  text?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  loading?: boolean;
  arrow?: boolean;
  variant?: string;
};
