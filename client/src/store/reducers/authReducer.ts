import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAuthState } from './tyings';

// Define the initial state with the correct types
const initialState: TAuthState = {
  profile: undefined,
  listOrder: undefined,
};

// Create the slice
export const { reducer: authReducer, actions: authActions } = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setOrder: (state, action: PayloadAction<any>) => {
      state.listOrder = action.payload;
    },
  },
});
