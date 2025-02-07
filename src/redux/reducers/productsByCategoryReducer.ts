import { createSlice } from '@reduxjs/toolkit';
import { product } from '../../interfaces/product';
import { getInCategory } from '../actions/getInCategory';

export interface productsByCategoryState {
  productsByCategory: product[] | [];
  productsByCategoryLoading: boolean;
  error: null | string | undefined;
}

const initialState: productsByCategoryState = {
  productsByCategory: [],
  productsByCategoryLoading: false,
  error: null
};

const productsByCategorySlice = createSlice({
  name: 'productsByCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInCategory.pending, (state) => {
        state.productsByCategoryLoading = true;
        state.error = null;
      })
      .addCase(getInCategory.fulfilled, (state, action) => {
        state.productsByCategoryLoading = false;
        state.productsByCategory = action.payload ? action.payload : [];
      })
      .addCase(getInCategory.rejected, (state, action) => {
        state.productsByCategoryLoading = false;
        state.error = action.error.message;
      });
  }
});

export default productsByCategorySlice.reducer;
