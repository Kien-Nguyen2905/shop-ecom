import { createSlice } from '@reduxjs/toolkit';
import { THUNK_STATUS } from '../../constants';
import {
  createOrderByBanking,
  createOrderByCOD,
  getOrder,
} from '../middlewares/orderMiddleWare';
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

    // Checkout COD
    builder.addCase(createOrderByCOD.pending, (state) => {
      state.checkoutStatus = THUNK_STATUS.pending;
    });
    builder.addCase(createOrderByCOD.fulfilled, (state) => {
      state.checkoutStatus = THUNK_STATUS.fullfilled;
    });
    builder.addCase(createOrderByCOD.rejected, (state) => {
      state.checkoutStatus = THUNK_STATUS.rejected;
    });

    // Checkout COD
    builder.addCase(createOrderByBanking.pending, (state) => {
      state.checkoutStatus = THUNK_STATUS.pending;
    });
    builder.addCase(createOrderByBanking.fulfilled, (state) => {
      state.checkoutStatus = THUNK_STATUS.fullfilled;
    });
    builder.addCase(createOrderByBanking.rejected, (state) => {
      state.checkoutStatus = THUNK_STATUS.rejected;
    });
  },
});
