import { createSlice } from '@reduxjs/toolkit';
import { getAllCategories } from '../actions/getAllCategories';

interface categoriesState {
  categories: string[] | [];
  categoriesLoading: boolean;
  error: null | string | undefined;
}

const initialState: categoriesState = {
  categories: [],
  categoriesLoading: false,
  error: null
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
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.error = action.error.message;
      });
  }
});

export default categoriesSlice.reducer;
