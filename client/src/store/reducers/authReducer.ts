import { createSlice } from '@reduxjs/toolkit';
import { TAuthState } from './tyings';

// Define the initial state with the correct types
const initialState: TAuthState = {
  profile: undefined,
};

// Create the slice
export const { reducer: authReducer, actions: authActions } = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});
