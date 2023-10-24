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
}

const initialState: cartState = {
  cartProducts: []
};

const cartSlice = createSlice({
  name: 'productsCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCart, (state, action) => {
      state.cartProducts = action.payload ? action.payload : [];
    });
  }
});

export default cartSlice.reducer;
