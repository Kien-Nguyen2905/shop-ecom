import { createSlice } from '@reduxjs/toolkit';
import { THUNK_STATUS } from '../../constants';
import { createOrder, getOrder } from '../middlewares/orderMiddleWare';
import { TOrderState } from './tyings';

const initialState: TOrderState = {
  orderInfo: undefined,
  checkoutStatus: THUNK_STATUS.fullfilled,
};

export const { reducer: orderReducer, actions: orderAction } = createSlice({
  initialState,
  name: 'order',
  reducers: {},
  extraReducers: (builder) => {
    // GET ORDER
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.orderInfo = action.payload;
    });

    builder.addCase(createOrder.pending, (state) => {
      state.checkoutStatus = THUNK_STATUS.pending;
    });
    builder.addCase(createOrder.fulfilled, (state) => {
      state.checkoutStatus = THUNK_STATUS.fullfilled;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.checkoutStatus = THUNK_STATUS.rejected;
    });
  },
});
