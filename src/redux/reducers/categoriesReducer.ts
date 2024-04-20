import { createSlice } from '@reduxjs/toolkit';
import { error } from '../../interfaces/error';
import { getAllcategory } from '../actions/getAllCategory';
import { category } from '../../interfaces/category';

export interface categoriesState {
  categories?: category[] | [];
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
      .addCase(getAllcategory.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(getAllcategory.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(getAllcategory.rejected, (state, action) => {
        state.categoriesLoading = false;
      });
  }
});

export default categoriesSlice.reducer;
