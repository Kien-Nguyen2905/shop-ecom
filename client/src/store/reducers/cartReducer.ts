import { createSlice } from '@reduxjs/toolkit';
import { THUNK_STATUS } from '../../constants';
import { addToCart, getCart, updateCart } from '../middlewares/cartMiddleware';
import { TCartState } from './tyings';
const initialState: TCartState = {
  cart: undefined,
  updateStatus: THUNK_STATUS.fullfilled,
  getStatus: THUNK_STATUS.fullfilled,
};
export const { reducer: cartReducer, actions: cartActions } = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    updateCacheCart: (state, action) => {
      state.cart = action.payload || state.cart;
    },
    clearCart: (state) => {
      state.cart = undefined;
    },
  },
  extraReducers: (builder) => {
    // GetCart
    builder.addCase(getCart.pending, (state) => {
      state.getStatus = THUNK_STATUS.pending;
    });
    //NOTE WHY ACTION.PAYLOAD
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.getStatus = THUNK_STATUS.fullfilled;
      state.cart = action.payload;
    });
    builder.addCase(getCart.rejected, (state) => {
      state.getStatus = THUNK_STATUS.rejected;
      state.cart = undefined;
    });
    //AddCart;
    builder.addCase(addToCart.pending, (state) => {
      state.updateStatus = THUNK_STATUS.pending;
    });
    builder.addCase(addToCart.fulfilled, (state) => {
      state.updateStatus = THUNK_STATUS.fullfilled;
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.updateStatus = THUNK_STATUS.rejected;
    });
    //UpdateCart;
    builder.addCase(updateCart.pending, (state) => {
      state.updateStatus = THUNK_STATUS.pending;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.getStatus = THUNK_STATUS.fullfilled;
      state.cart = action.payload;
    });
    builder.addCase(updateCart.rejected, (state) => {
      state.updateStatus = THUNK_STATUS.rejected;
    });
  },
});
