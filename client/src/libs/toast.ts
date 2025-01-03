import { toast } from 'react-toastify';
import { IToast } from './tyings';
import { UseFormSetError } from 'react-hook-form';
import { EntityError, handleAxiosError } from './http';

export function showToast({ type, message }: IToast) {
  toast[type](message);
}

export const handleError = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  // Kiểm tra nếu error là một AxiosError và xử lý
  if (error.isAxiosError) {
    // Xử lý lỗi Axios và tạo đối tượng HttpError thích hợp
    const handledError = handleAxiosError(error);
    // Kiểm tra nếu lỗi là EntityError (lỗi 422)
    if (handledError instanceof EntityError) {
      const { message, errors } = handledError.payload;
      if (setError && errors) {
        // Xử lý lỗi cho từng trường
        if (Object.keys(errors).length > 0) {
          for (const field in errors) {
            setError(field, {
              type: 'server',
              message: errors[field],
            });
          }
        } else {
          toast.error(message || 'Something went wrong', {
            autoClose: duration ?? 5000,
          });
        }
        return;
      } else {
        // Hiển thị lỗi chung nếu không có lỗi cho trường cụ thể
        toast.error(message || 'Something went wrong', {
          autoClose: duration ?? 5000,
        });
      }
    } else {
      // Hiển thị lỗi chung cho các lỗi không phải 422
      toast.error(handledError.message || 'Something went wrong', {
        autoClose: duration ?? 5000,
      });
    }
  } else {
    // Nếu không phải lỗi Axios, hiển thị lỗi chung
    toast.error(error?.message ?? 'Something went wrong', {
      autoClose: duration ?? 5000,
    });
  }
};
