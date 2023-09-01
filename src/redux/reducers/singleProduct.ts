import { createSlice } from '@reduxjs/toolkit';
import { product } from '../../interfaces/product';
import { getSingleProduct } from '../actions/getSingleProduct';

interface productState {
  product: product | {};
  loading: boolean;
  error: null | string | undefined;
}

const initialState: productState = {
  product: {},
  loading: false,
  error: null
};

const singleProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default singleProductSlice.reducer;
