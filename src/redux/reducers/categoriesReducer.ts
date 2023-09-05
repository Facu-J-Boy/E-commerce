import { createSlice } from '@reduxjs/toolkit';
import { getAllCategories } from '../actions/getAllCategories';

interface categoriesState {
  categories: string[] | [];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: categoriesState = {
  categories: [],
  loading: false,
  error: null
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default categoriesSlice.reducer;
