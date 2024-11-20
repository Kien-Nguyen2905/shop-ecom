import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE } from '../../constants';
import { TAuthState, TProfile } from './tyings';

// Define the initial state with the correct types
const initialState: TAuthState = {
  profile: null,
  listOrder: null,
};

// Create the slice
export const { reducer: authReducer, actions: authActions } = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    logout: (state) => {
      localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE.ROLE);
      state.profile = null;
    },
    setProfile: (state, action: PayloadAction<TProfile | null>) => {
      state.profile = action.payload;
    },
    setOrder: (state, action: PayloadAction<any>) => {
      state.listOrder = action.payload;
    },
  },
});
