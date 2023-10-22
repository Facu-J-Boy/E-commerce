import { createSlice } from '@reduxjs/toolkit';
import { getAllProducts } from '../actions/getAllproducts';
import { product } from '../../interfaces/product';
import { searchProducts } from '../actions/searchProducts';

export interface productsState {
  products: product[] | [];
  allProducts?: product[] | [];
  productsLoading: boolean;
  error: null | string | undefined;
}

const initialState: productsState = {
  products: [],
  allProducts: [], //En allProducts se almacenan todos los productos que se utilizarán para ser filtrados en las busquedas
  productsLoading: false,
  error: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.productsLoading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.products = action.payload;
        state.allProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.productsLoading = false;
        state.error = action.error.message;
      })
      .addCase(searchProducts, (state, action) => {
        state.products = action.payload;
        state.error = action.error;
      });
  }
});

export default productsSlice.reducer;
