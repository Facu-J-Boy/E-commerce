import { createSlice } from '@reduxjs/toolkit';
import { getAllProducts } from '../actions/getAllproducts';
import { product } from '../../interfaces/product';
import { error } from '../../interfaces/error';
import { deleteProduct } from '../actions/deleteProduct';

export interface productsState {
  title: string;
  products: product[] | [];
  currentPage?: number | null;
  totalPages?: number | null;
  productsLoading?: boolean;
  deleting?: boolean;
  message: string;
  productsError?: error | null | undefined;
}

const initialState: productsState = {
  title: '',
  products: [],
  currentPage: null,
  totalPages: null,
  productsLoading: false,
  deleting: false,
  message: '',
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
        state.message = '';
        state.productsError = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.productsLoading = false;

        // Desestructurar el objeto action.payload
        const {
          title,
          products,
          currentPage,
          totalPages,
          message,
          productsError
        } = action.payload.payload;

        state.title = title;
        state.products = products;
        state.currentPage = currentPage;
        state.totalPages = totalPages;
        state.message = message;
        state.productsError = productsError;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.productsLoading = false;
        state.productsError = {
          type: 'fetch',
          text: 'An error has occurred, please try again'
        };
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleting = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload.productDeleted?._id
        );
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.deleting = false;
      });
  }
});

export default productsSlice.reducer;
