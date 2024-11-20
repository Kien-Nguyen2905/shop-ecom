import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE } from '../../constants';

// Define the profile type
interface Profile {
  _id: string;
  email: string;
  role: number;
  full_name: string;
  phone: string;
  address: Record<string, unknown>; // Assuming address is an object, modify if necessary
  earn_point: number;
  total_paid: number;
}

// Define the state type
interface AuthState {
  profile: Profile | null; // Profile can be null initially
  listOrder: any; // Define the type of listOrder if needed
}

// Define the initial state with the correct types
const initialState: AuthState = {
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
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
    setOrder: (state, action: PayloadAction<any>) => {
      state.listOrder = action.payload;
    },
  },
});
