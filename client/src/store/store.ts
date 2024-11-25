import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { authReducer, cartReducer } from './reducers';
import {
  TypedUseSelectorHook,
  useSelector as rawUseSelector,
} from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk as any),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
export default store;
