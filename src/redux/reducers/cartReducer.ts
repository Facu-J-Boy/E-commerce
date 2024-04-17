import { createSlice } from '@reduxjs/toolkit';
import { getCart } from '../actions/getCart';

interface product {
  id: string;
  title: string;
  image: string;
  price: number;
}

interface cartState {
  cartLoading: boolean;
  cartProducts: product[] | [];
  total: string;
  message: string;
}

const initialState: cartState = {
  cartLoading: false,
  cartProducts: [],
  total: '0',
  message: ''
};

const cartSlice = createSlice({
  name: 'productsCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.cartLoading = true;
        state.message = '';
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartProducts = action.payload.products;
        state.total = action.payload.total;
        state.message = action.payload.message;
      })
      .addCase(getCart.rejected, (state) => {
        state.cartLoading = false;
      });
  }
});

export default cartSlice.reducer;
