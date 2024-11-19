import { createAsyncThunk } from '@reduxjs/toolkit';
import { TLoginPayload, TProfileResponse } from '../../services/Auth/typings';
import { authServices } from '../../services/Auth';
import { LOCAL_STORAGE } from '../../constants';
import { authActions } from '../reducers';
import { SuccessResponse } from '../../services/tyings';

// Define the interface for each thunk
// Define the thunks
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
    // Dispatch profile user action
    return await thunkAPI.dispatch(profileUser()).unwrap();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const profileUser = createAsyncThunk<
  SuccessResponse<TProfileResponse>, // The return type should be the profile data
  void,
  { rejectValue: string }
>('auth/profile', async (_, thunkAPI) => {
  try {
    const resProfile = await authServices.getProfile();

    // Ensure you're returning only the data, not the whole AxiosResponse
    const profileData = resProfile.data; // Assuming the structure is { data: { data: profileData }}
    // Dispatch profile user data to the store
    thunkAPI.dispatch(authActions.setProfile(profileData.data));

    // Return the profile data (TProfileResponse)
    return profileData;
  } catch (error: any) {
    console.error('Fetching profile failed:', error);
    return thunkAPI.rejectWithValue(error);
  }
});
