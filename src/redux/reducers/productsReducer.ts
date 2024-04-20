import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getAllProducts } from '../actions/getAllproducts';
import { product } from '../../interfaces/product';
import { error } from '../../interfaces/error';

export interface productsState {
  title: string;
  products: product[] | [];
  currentPage?: number | null;
  totalPages?: number | null;
  productsLoading?: boolean;
  message: string;
  productsError?: error | null | undefined;
}

const initialState: productsState = {
  title: '',
  products: [],
  currentPage: null,
  totalPages: null,
  productsLoading: false,
  message: '',
  productsError: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
      state.currentPage = 1;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
    }
  },
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
      });
  }
});

export const { changeTitle, changePage, clearProducts } = productsSlice.actions;

export default productsSlice.reducer;
