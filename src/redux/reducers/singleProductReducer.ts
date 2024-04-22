import { createSlice } from '@reduxjs/toolkit';
import { product } from '../../interfaces/product';
import { getSingleProduct } from '../actions/getSingleProduct';
import { clearProductState } from '../actions/clearProductState';
import { createProduct } from '../actions/createProduct';

interface productState {
  product: product | {};
  productLoading: boolean;
  creating: boolean;
  error: null | string | undefined;
}

const initialState: productState = {
  product: {},
  productLoading: false,
  creating: false,
  error: null
};

const singleProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.productLoading = true;
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.product = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.creating = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.creating = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.creating = false;
      })
      .addCase(clearProductState, (state, action) => {
        state.product = action.payload;
      });
  }
});

export default singleProductSlice.reducer;
