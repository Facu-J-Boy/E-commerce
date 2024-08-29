import { createSlice } from '@reduxjs/toolkit';
import { product } from '../../interfaces/product';
import { getSingleProduct } from '../actions/getSingleProduct';
import { createProduct } from '../actions/createProduct';
import { updateProduct } from '../actions/updateProduct';

export interface productState {
  product: product | null;
  productLoading: boolean;
  creating: boolean;
  updating: boolean;
  newImage: string;
  updatingImage: boolean;
  error: string;
}

const initialState: productState = {
  product: null,
  productLoading: false,
  creating: false,
  updating: false,
  newImage: '',
  updatingImage: false,
  error: ''
};

const singleProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
      state.newImage = '';
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.productLoading = true;
        state.error = '';
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.product = action.payload.product;
        state.error = action.payload.message;
        state.newImage = action.payload.image;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.productLoading = false;
        state.error = '';
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
      .addCase(updateProduct.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.updating = false;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.updating = false;
      });
  }
});

export const { clearProduct } = singleProductSlice.actions;

export default singleProductSlice.reducer;
