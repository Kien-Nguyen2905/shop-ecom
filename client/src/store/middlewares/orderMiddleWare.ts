import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCart } from './cartMiddleware';
import orderServices from '../../services/Order/orderServices';
import { TActionCancelOrderPayload, TActionOrderPayload } from './tyings';

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

export const createOrder = createAsyncThunk(
  'order/create',
  async (actionPayload: TActionOrderPayload, thunkAPI) => {
    try {
      const res = await orderServices.createOrder(actionPayload);
      if (res.data.data._id) {
        thunkAPI.dispatch(getOrder());
        thunkAPI.dispatch(getCart());
        thunkAPI.fulfillWithValue(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  },
);

export const cancelOrder = createAsyncThunk(
  'order/cancle',
  async (actionPayload: TActionCancelOrderPayload, thunkAPI) => {
    try {
      const res = await orderServices.cancelOrder(actionPayload);
      thunkAPI.dispatch(getOrder());
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  },
);
