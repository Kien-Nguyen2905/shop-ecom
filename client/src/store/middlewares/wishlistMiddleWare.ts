import { createAsyncThunk } from '@reduxjs/toolkit';
import { wishlistServices } from '../../services/Wishlist';
import { wishlistActions } from '../reducers';
import { TUpdateWishlistPayload } from '../../services/Wishlist/tyings';
import { productServices } from '../../services/Product';

export const getWishlist = createAsyncThunk(
  'wishlist/get',
  async (_, thunkAPI) => {
    try {
      const resWishlist = await wishlistServices.getWishlist();
      const wishlist = resWishlist.data.data;
      const resProduct = await productServices.getProduct();
      const products = resProduct.data.data.products;
      const wishlistModified = wishlist.products
        .map((wishlistItem) => {
          const product = products.find(
            (product) => product._id === wishlistItem.product_id,
          );

          if (!product) return null;

          const variant = product.variants.find(
            (variant) => variant._id === wishlistItem.variant_id,
          );

          if (!variant) return null;

          return {
            product_id: wishlistItem.product_id,
            variant_id: wishlistItem.variant_id,
            name: product.name,
            image: product.thumbnail,
            color: variant.color,
            price: variant.price,
            discount: variant.discount,
          };
        })
        .filter(Boolean); // Loại bỏ các giá trị `null`
      thunkAPI.dispatch(
        wishlistActions.setWishlist({
          ...wishlist,
          products: wishlistModified,
        }),
      );
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  },
);

export const updateWishlist = createAsyncThunk(
  'wishlist/update',
  async (acctionPayload: TUpdateWishlistPayload, thunkAPI) => {
    try {
      const res = await wishlistServices.updateWishlist(acctionPayload);
      thunkAPI.dispatch(getWishlist());
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  },
);
