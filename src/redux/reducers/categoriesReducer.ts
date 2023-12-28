import { createSlice } from '@reduxjs/toolkit';
import { getAllCategories } from '../actions/getAllCategories';
import { error } from '../../interfaces/error';

export interface categoriesState {
  categories?: string[] | [];
  categoriesLoading?: boolean;
  categoriesError?: error | null | undefined;
}

const initialState: categoriesState = {
  categories: [],
  categoriesLoading: false,
  categoriesError: null
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;

        // Desestructurar el objeto action.payload
        const { categories, categoriesError } = action.payload.payload;

        state.categories = categories;
        state.categoriesError = categoriesError;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError = {
          type: 'fetch',
          text: 'An error has occurred, please try again'
        };
      });
  }
});

export default categoriesSlice.reducer;
