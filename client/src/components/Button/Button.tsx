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
}) => {
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={`${className} ${
        loading ? 'cursor-not-allowed opacity-50 border-opacity-50' : ''
      } flex w-[120px] flex-row justify-center gap-1 border text-primary border-primary py-[8.5px] px-[15px] 
      bg-transparent hover:bg-primary hover:text-white transition`}
    >
      {loading ? (
        <Spin size="small" className="text-primary" />
      ) : (
        children || (
          <>
            {text} <IoIosArrowRoundForward size={20} />
          </>
        )
      )}
    </button>
  );
};

export default Button;
