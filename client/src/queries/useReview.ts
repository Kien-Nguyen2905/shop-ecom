import { useQuery } from '@tanstack/react-query';
import { TReviewResponse } from '../services/Review/tyings';
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
