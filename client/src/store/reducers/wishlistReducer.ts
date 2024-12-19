import { createSlice } from '@reduxjs/toolkit';
import { TWishlistState } from './tyings';

const initialState: TWishlistState = {
  wishlist: undefined,
};

// Create the slice
export const { reducer: wishlistReducer, actions: wishlistActions } =
  createSlice({
    initialState,
    name: 'wishlist',
    reducers: {
      setWishlist: (state, action) => {
        state.wishlist = action.payload;
      },
    },
  });