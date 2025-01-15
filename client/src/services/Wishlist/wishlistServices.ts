import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import { TUpdateWishlistPayload, TWishlistResponse } from './tyings';

const wishlistServices = {
  getWishlist: () => {
    return instance.get<SuccessResponse<TWishlistResponse>>(`/wishlist`);
  },
  updateWishlist: (payload: TUpdateWishlistPayload) => {
    return instance.put<SuccessResponse<TWishlistResponse>>(
      `/wishlist`,
      payload,
    );
  },
};
export default wishlistServices;
