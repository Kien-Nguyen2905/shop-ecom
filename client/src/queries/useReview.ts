import { useQuery } from '@tanstack/react-query';
import {
  TReviewByProductIdResponse,
  TReviewResponse,
} from '../services/Review/tyings';
import { reviewServices } from '../services/Review';

export const useReviewQuery = () => {
  return useQuery<TReviewResponse>({
    queryKey: ['reviews'],
    queryFn: async () => {
      const response = await reviewServices.getReview();
      return response.data.data || [];
    },
  });
};

export const useReviewByProductIdQuery = (productId: string = '') => {
  return useQuery<TReviewByProductIdResponse[]>({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const response = await reviewServices.getReviewByProductId(productId);
      return response.data.data || [];
    },
    enabled: !!productId,
  });
};
