import { useReviewQuery } from '../../queries/useReview';

export const useReviewAdminPage = () => {
  const { data: reviewData } = useReviewQuery();

  return {
    reviewData,
  };
};
