import React from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { Spin } from 'antd'; // Import the Spin component
import { TButtonProps } from './typings';

const Button: React.FC<TButtonProps> = ({
  text,
  disabled = false,
  className = '',
  onClick,
  loading = false,
  children,
  type = false,
  variant = 'default', // Variant: default | delete
}) => {
  const variantStyles: Record<string, string> = {
    default: 'text-primary border-primary hover:bg-primary hover:text-white',
    delete: 'text-red-600 border-red-600 hover:bg-red-600 hover:text-white',
  };

  const appliedStyles = variantStyles[variant] || variantStyles.default;

  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={`${className} ${
        loading ? 'cursor-not-allowed opacity-50 border-opacity-50' : ''
      } flex flex-row items-center w-max justify-center gap-1 border py-[8.5px] px-[15px] 
      bg-transparent transition ${appliedStyles}`}
    >
      {loading ? (
        <Spin size="small" className="text-primary " />
      ) : (
        (
          <>
            {text}
            {children}
          </>
        ) || (
          <>
            {text} {type ? '' : <IoIosArrowRoundForward size={20} />}
          </>
        )
      )}
    </button>
  );
};

export default Button;
