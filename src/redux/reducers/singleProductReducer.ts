import { createSlice } from '@reduxjs/toolkit';
import { product } from '../../interfaces/product';
import { getSingleProduct } from '../actions/getSingleProduct';
import { createProduct } from '../actions/createProduct';
import { updateProduct } from '../actions/updateProduct';
import { updateProductImage } from '../actions/updateProductImage';

interface productState {
  product: product | {};
  productLoading: boolean;
  creating: boolean;
  updating: boolean;
  newImage: string;
  updatingImage: boolean;
  error: null | string | undefined;
}

const initialState: productState = {
  product: {},
  productLoading: false,
  creating: false,
  updating: false,
  newImage: '',
  updatingImage: false,
  error: null
};

const singleProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = {};
      state.newImage = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.productLoading = true;
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.product = action.payload;
        state.newImage = action.payload.image;
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
      .addCase(updateProductImage.pending, (state) => {
        state.updatingImage = true;
      })
      .addCase(updateProductImage.fulfilled, (state, action) => {
        state.updatingImage = false;
        if (action.payload.image) {
          state.newImage = action.payload.image;
        }
      })
      .addCase(updateProductImage.rejected, (state) => {
        state.updatingImage = false;
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
