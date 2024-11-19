import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import { TReviewResponse } from './tyings';

const reviewService = {
  getReview: (queryString: string = '') => {
    return instance.get<SuccessResponse<TReviewResponse>>(
      `/review${queryString ? '?' : ''}${queryString}`,
    );
  },
};
export default reviewService;
