import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCart } from './cartMiddleware';
import orderServices from '../../services/Order/orderServices';
import { transactionServices } from '../../services/Transaction';
import { TActionBankingPayload, TActionCODPayload } from './tyings';

export const getOrder = createAsyncThunk('order/get', async (_, thunkAPI) => {
  try {
    const res = await orderServices.getOrder();
    thunkAPI.fulfillWithValue(res.data.data);
    return res.data.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error);
    throw error;
  }
});

export const createOrderByCOD = createAsyncThunk(
  'order/cod',
  async (actionPayload: TActionCODPayload, thunkAPI) => {
    try {
      const dataCOD = await transactionServices.createTransactionCOD({
        type_payment: actionPayload?.type_payment!,
        value: actionPayload.total,
      });

      if (dataCOD.data.data._id) {
        const res = await orderServices.createOrder({
          ...actionPayload,
          transaction_id: dataCOD.data.data._id,
        });
        if (res.data.data._id) {
          thunkAPI.dispatch(getOrder());
          thunkAPI.dispatch(getCart());
          thunkAPI.fulfillWithValue(res.data.data);
          return res.data.data;
        }
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  },
);

export const createOrderByBanking = createAsyncThunk(
  'order/banking',
  async (actionPayload: TActionBankingPayload, thunkAPI) => {
    try {
      const { data } = await transactionServices.getTransactionSePay(
        `?content=${actionPayload.desc}&value=${actionPayload?.value}`,
      );
      if (data.data._id) {
        const res = await orderServices.createOrder({
          ...actionPayload.order!,
          transaction_id: data.data._id!,
        });
        if (res.data.data._id) {
          thunkAPI.dispatch(getOrder());
          thunkAPI.dispatch(getCart());
        }
        thunkAPI.fulfillWithValue(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  },
);
