import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { authReducer } from './reducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk as any),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
