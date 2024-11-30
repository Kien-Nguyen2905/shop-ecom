import { createAsyncThunk } from '@reduxjs/toolkit';
import { wishlistServices } from '../../services/Wishlist';
import { wishlistActions } from '../reducers';
import { TAddWishlistPayload } from '../../services/Wishlist/tyings';

export const getWishlist = createAsyncThunk(
  'wishlist/get',
  async (_, thunkAPI) => {
    try {
      const res = await wishlistServices.getWishlist();
      thunkAPI.dispatch(wishlistActions.setWishlist(res.data.data));
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  },
);

export const updateWishlist = createAsyncThunk(
  'wishlist/update',
  async (acctionPayload: TAddWishlistPayload, thunkAPI) => {
    try {
      const res = await wishlistServices.updateWishlist(acctionPayload);
      thunkAPI.dispatch(getWishlist());
      return res.data.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  },
);
