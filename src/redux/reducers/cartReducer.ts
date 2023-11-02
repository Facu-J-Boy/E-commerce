import { createSlice } from '@reduxjs/toolkit';
import { getCart } from '../actions/getCart';

interface product {
  id: string;
  title: string;
  image: string;
  price: number;
}

interface cartState {
  cartProducts: product[] | [];
  total: string;
}

const initialState: cartState = {
  cartProducts: [],
  total: '0'
};

const cartSlice = createSlice({
  name: 'productsCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCart, (state, action) => {
      state.cartProducts = action.payload ? action.payload.products : [];
      state.total = action.payload ? action.payload.total : '0';
    });
  }
});

export default cartSlice.reducer;
