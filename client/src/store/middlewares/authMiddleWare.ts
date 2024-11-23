import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  TLoginPayload,
  TLogoutPayload,
  TProfileResponse,
} from '../../services/Auth/typings';
import { authServices } from '../../services/Auth';
import { LOCAL_STORAGE } from '../../constants';
import { authActions } from '../reducers';
import { SuccessResponse } from '../../services/tyings';

export const login = createAsyncThunk<
  SuccessResponse<TProfileResponse>,
  TLoginPayload,
  { rejectValue: string }
>('auth/login', async (payload, thunkAPI) => {
  try {
    const res = await authServices.login(payload);
    localStorage.setItem(
      LOCAL_STORAGE.ACCESS_TOKEN,
      res.data?.data.access_token,
    );
    localStorage.setItem(
      LOCAL_STORAGE.REFRESH_TOKEN,
      res.data?.data.refresh_token,
    );
    localStorage.setItem(
      LOCAL_STORAGE.REFRESH_TOKEN,
      res.data.data.refresh_token,
    );
    return await thunkAPI.dispatch(profileUser()).unwrap();
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
      localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE.ROLE);
      thunkAPI.dispatch(authActions.setProfile(null));
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const profileUser = createAsyncThunk<
  SuccessResponse<TProfileResponse>,
  void,
  { rejectValue: string }
>('auth/profile', async (_, thunkAPI) => {
  try {
    const resProfile = await authServices.getProfile();

    const profileData = resProfile.data;
    thunkAPI.dispatch(authActions.setProfile(profileData.data));

    return profileData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});