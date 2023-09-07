import { createSlice } from '@reduxjs/toolkit';
import { getAllProducts } from '../actions/getAllproducts';
import { product } from '../../interfaces/product';
import { searchProducts } from '../actions/searchProducts';

export interface productsState {
  products: product[] | [];
  allProducts?: product[] | [];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: productsState = {
  products: [],
  allProducts: [],
  loading: false,
  error: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.allProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchProducts, (state, action) => {
        state.products = action.payload;
        state.error = action.error;
      });
  }
});

export default productsSlice.reducer;
