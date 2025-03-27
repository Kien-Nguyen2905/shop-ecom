import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  TLoginPayload,
  TLogoutPayload,
  TUserProfileResponse,
  TUpdateProfilePayload,
} from '../../services/Auth/typings';
import { authServices } from '../../services/Auth';
import { LOCAL_STORAGE } from '../../constants';
import { authActions, cartActions } from '../reducers';
import { SuccessResponse } from '../../services/tyings';
import { getCart } from './cartMiddleware';
import { getWishlist } from './wishlistMiddleWare';
import { getOrder } from './orderMiddleWare';
import { removeLocalStorage, setLocalStorage } from '../../utils/localStorage';

export const login = createAsyncThunk<
  SuccessResponse<TUserProfileResponse>,
  TLoginPayload,
  { rejectValue: string }
>('auth/login', async (payload, thunkAPI) => {
  try {
    const res = await authServices.login(payload);
    const { access_token, refresh_token, role } = res.data.data;
    if (access_token && refresh_token) {
      setLocalStorage({
        [LOCAL_STORAGE.ACCESS_TOKEN]: access_token,
        [LOCAL_STORAGE.REFRESH_TOKEN]: refresh_token,
        [LOCAL_STORAGE.ROLE]: role.toString(),
      });
      await Promise.all([
        thunkAPI.dispatch(getCart()).unwrap(),
        thunkAPI.dispatch(getWishlist()).unwrap(),
        thunkAPI.dispatch(getOrder()).unwrap(),
      ]);
      return await thunkAPI.dispatch(profileUser()).unwrap();
    }
    return thunkAPI.rejectWithValue('Error');
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk<
  void,
  TLogoutPayload,
  { rejectValue: string }
>('auth/logout', async (payload, thunkAPI) => {
  try {
    const res = await authServices.logout(payload);
    if (res.data.status === 200) {
      removeLocalStorage([
        LOCAL_STORAGE.ACCESS_TOKEN,
        LOCAL_STORAGE.REFRESH_TOKEN,
        LOCAL_STORAGE.ROLE,
      ]);

      await Promise.all([
        thunkAPI.dispatch(authActions.setProfile(null)),
        thunkAPI.dispatch(cartActions.clearCart()),
      ]);
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const profileUser = createAsyncThunk<
  SuccessResponse<TUserProfileResponse>,
  void,
  { rejectValue: string }
>('auth/profile', async (_, thunkAPI) => {
  try {
    const res = await authServices.getProfile();
    thunkAPI.dispatch(authActions.setProfile(res.data.data));
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateProfileUser = createAsyncThunk<
  SuccessResponse<TUserProfileResponse>,
  TUpdateProfilePayload,
  { rejectValue: string }
>('auth/updateProfile', async (payload, thunkAPI) => {
  try {
    await authServices.updateProfile(payload);
    return thunkAPI.dispatch(profileUser()).unwrap();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
