import { instance } from '../Interceptor';
import { SuccessResponse } from '../tyings';
import { TAddWishlistPayload, TWishlistResponse } from './tyings';

const wishlistServices = {
  getWishlist: () => {
    return instance.get<SuccessResponse<TWishlistResponse>>(`/wishlist`);
  },
  addWishlist: (payload: TAddWishlistPayload) => {
    return instance.put<SuccessResponse<TWishlistResponse>>(
      `/wishlist`,
      payload,
    );
  },
};
export default wishlistServices;
