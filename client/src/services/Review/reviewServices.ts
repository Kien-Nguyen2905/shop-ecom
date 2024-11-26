import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import { TReviewByProductIdResponse, TReviewResponse } from './tyings';

const reviewService = {
  getReview: (queryString: string = '') => {
    return instance.get<SuccessResponse<TReviewResponse>>(
      `/review${queryString ? '?' : ''}${queryString}`,
    );
  },
  getReviewByProductId: (productId: string = '') => {
    return instance.get<SuccessResponse<TReviewByProductIdResponse>>(
      `/review${productId ? `/${productId}` : ''}`,
    );
  },
};
export default reviewService;
