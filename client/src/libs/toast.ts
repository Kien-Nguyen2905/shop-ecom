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
  if (error.isAxiosError) {
    const handledError = handleAxiosError(error);
    if (handledError instanceof EntityError) {
      const { message, errors } = handledError.payload;
      if (setError && errors) {
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
        toast.error(message || 'Something went wrong', {
          autoClose: duration ?? 5000,
        });
      }
    } else {
      toast.error(handledError.message || 'Something went wrong', {
        autoClose: duration ?? 5000,
      });
    }
  } else {
    toast.error(error?.message ?? 'Something went wrong', {
      autoClose: duration ?? 5000,
    });
  }
};
