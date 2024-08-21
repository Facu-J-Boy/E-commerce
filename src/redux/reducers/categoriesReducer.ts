import { createSlice } from '@reduxjs/toolkit';
import { error } from '../../interfaces/error';
import { getAllcategory } from '../actions/getAllCategory';
import { deleteCategory } from '../actions/deleteCategory';
import { category } from '../../interfaces/category';

export interface categoriesState {
  categories?: category[] | [];
  categoriesLoading?: boolean;
  deletingCategory?: boolean;
  categoriesError?: error | null | undefined;
}

const initialState: categoriesState = {
  categories: [],
  categoriesLoading: false,
  deletingCategory: false,
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
      })
      .addCase(deleteCategory.pending, (state) => {
        state.deletingCategory = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deletingCategory = false;
        state.categories = state.categories?.filter(
          (category) => category._id !== action.payload.dropCategoryId
        );
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.deletingCategory = false;
      });
  }
});

export default categoriesSlice.reducer;
