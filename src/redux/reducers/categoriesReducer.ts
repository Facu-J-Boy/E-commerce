import { createSlice } from '@reduxjs/toolkit';
import { error } from '../../interfaces/error';
import { getAllcategory } from '../actions/getAllCategory';
import { deleteCategory } from '../actions/deleteCategory';
import { category } from '../../interfaces/category';
import { editCategory } from '../actions/editCategory';

export interface categoriesState {
  categories?: category[] | [];
  categoriesLoading?: boolean;
  changingCategory?: boolean;
  categoriesError?: error | null | undefined;
}

const initialState: categoriesState = {
  categories: [],
  categoriesLoading: false,
  changingCategory: false,
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
        state.changingCategory = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.changingCategory = false;
        state.categories = state.categories?.filter(
          (category) => category._id !== action.payload.dropCategoryId
        );
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.changingCategory = false;
      })
      .addCase(editCategory.pending, (state) => {
        state.changingCategory = true;
      })
      .addCase(editCategory.fulfilled, (state) => {
        state.changingCategory = false;
      })
      .addCase(editCategory.rejected, (state) => {
        state.changingCategory = false;
      });
  }
});

export default categoriesSlice.reducer;
