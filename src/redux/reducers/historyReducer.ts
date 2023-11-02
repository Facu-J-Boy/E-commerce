import { createSlice } from '@reduxjs/toolkit';
import { getHistory } from '../actions/getHistory';

interface product {
  id: string;
  title: string;
  image: string;
  price: number;
}

interface cartState {
  historyProducts: product[] | [];
  historyProductsLoading: boolean;
}

const initialState: cartState = {
  historyProducts: [],
  historyProductsLoading: true
};

const historySlice = createSlice({
  name: 'productsHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHistory, (state, action) => {
      state.historyProducts = action.payload ? action.payload.products : [];
      state.historyProductsLoading = false;
    });
  }
});

export default historySlice.reducer;
