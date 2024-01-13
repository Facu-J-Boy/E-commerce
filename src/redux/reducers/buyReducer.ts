import { createSlice } from '@reduxjs/toolkit';
import { product } from '../../interfaces/product';
import { Buy } from '../actions/buy';

interface buyState {
  productsToBuy: product[];
}

const initialState: buyState = {
  productsToBuy: []
};

const buySlice = createSlice({
  name: 'buy',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Buy, (state, action) => {
      state.productsToBuy = action.payload;
    });
  }
});

export default buySlice.reducer;
