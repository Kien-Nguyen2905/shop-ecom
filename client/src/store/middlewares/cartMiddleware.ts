import { createAsyncThunk } from '@reduxjs/toolkit';
import cartServices from '../../services/Cart/cartServics';
import {
  TRemoveCartPayload,
  TUpdateCartPayload,
} from '../../services/Cart/tyings';
export const getCart = createAsyncThunk('cart/get', async (_, thunkAPI) => {
  try {
    // Gọi API lấy thông tin giỏ hàng
    const res = await cartServices.getCart();
    const cartData = res.data.data;

    // Tính toán tổng giá trị từng phần
    const subTotal =
      cartData.products?.reduce((curr, product) => {
        return curr + product.price * product.quantity;
      }, 0) || 0;

    const totalDiscount =
      cartData.products?.reduce((curr, product) => {
        return curr + product.price * (1 - product.discount) * product.quantity;
      }, 0) || 0;
    let total = subTotal;
    if (subTotal > totalDiscount) {
      total = totalDiscount;
    }
    const totalProduct =
      cartData.products?.reduce((curr, product) => {
        return curr + product.quantity;
      }, 0) || 0;

    // Tạo object trả về đã được tính toán
    const modCartInfo = {
      ...cartData,
      subTotal,
      total,
      totalProduct,
    };
    // Trả dữ liệu qua thunkAPI
    thunkAPI.fulfillWithValue(modCartInfo);
    return modCartInfo;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addToCart = createAsyncThunk(
  'cart/add',
  async (actionPayload: TUpdateCartPayload, thunkAPI) => {
    try {
      const res = await cartServices.updateCart(actionPayload);
      thunkAPI.dispatch(getCart());
      thunkAPI.fulfillWithValue(res.data.data);
      return res.data.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  },
);

export const removeCart = createAsyncThunk(
  'cart/remove',
  async (actionPayload: TRemoveCartPayload, thunkAPI) => {
    try {
      const res = await cartServices.removeCart(actionPayload);
      thunkAPI.dispatch(getCart());
      return res.data.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  },
);