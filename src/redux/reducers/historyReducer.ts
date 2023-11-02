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
}

const initialState: cartState = {
  historyProducts: []
};

const cartSlice = createSlice({
  name: 'productsHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHistory, (state, action) => {
      state.historyProducts = action.payload ? action.payload.products : [];
    });
  }
});

export default cartSlice.reducer;
