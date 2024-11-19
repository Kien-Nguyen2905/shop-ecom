import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import { TReviewResponse } from './tyings';

const reviewService = {
  getReview: () => {
    return instance.get<SuccessResponse<TReviewResponse>>(`/review`);
  },
};
export default reviewService;
