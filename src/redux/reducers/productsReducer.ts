import { createSlice } from '@reduxjs/toolkit';
import { getAllProducts } from '../actions/getAllproducts';
import { product } from '../../interfaces/product';
import { searchProducts } from '../actions/searchProducts';
import { clearProductsList } from '../actions/clearProductsList';
import { error } from '../../interfaces/error';

export interface productsState {
  products: product[] | [];
  allProducts?: product[] | [];
  productsLoading?: boolean;
  productsError?: error | null | undefined;
}

const initialState: productsState = {
  products: [],
  allProducts: [], //En allProducts se almacenan todos los productos que se utilizarán para ser filtrados en las busquedas
  productsLoading: false,
  productsError: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.productsLoading = true;
        state.productsError = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.productsLoading = false;

        // Desestructurar el objeto action.payload
        const { products, productsError } = action.payload.payload;

        state.products = products;
        state.allProducts = products;
        state.productsError = productsError;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.productsLoading = false;
        state.productsError = {
          type: 'fetch',
          text: 'An error has occurred, please try again'
        };
      })
      .addCase(searchProducts, (state, action) => {
        state.products = action.payload;
        state.productsError = action.error;
      })
      .addCase(clearProductsList, (state, action) => {
        state.products = action.payload;
      });
  }
});

export default productsSlice.reducer;
