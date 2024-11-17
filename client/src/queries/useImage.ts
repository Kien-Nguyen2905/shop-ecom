import { useMutation } from '@tanstack/react-query';
import imageServices from '../services/Image/imageServices';

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: (payload: FormData) => imageServices.uploadImage(payload),
  });
};
