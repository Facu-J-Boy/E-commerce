import { createSlice } from '@reduxjs/toolkit';
import { getCart } from '../actions/getCart';
import { addToCart } from '../actions/addToCart';

interface product {
  id: string;
  title: string;
  image: string;
  price: number;
}

interface cartState {
  cartLoading: boolean;
  adding: boolean;
  cartProducts: product[] | [];
  total: string;
  message: string;
}

const initialState: cartState = {
  cartLoading: false,
  adding: false,
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
        state.cartProducts = action.payload && action.payload.products;
        state.total = action.payload && action.payload.total;
        state.message = action.payload && action.payload.message;
      })
      .addCase(getCart.rejected, (state) => {
        state.cartLoading = false;
      })
      .addCase(addToCart.pending, (state) => {
        state.adding = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartProducts = action.payload.products;
        state.total = action.payload.total;
        state.message = action.payload.message;
        state.adding = false;
      })
      .addCase(addToCart.rejected, (state) => {
        state.adding = false;
      });
  }
});

export default cartSlice.reducer;
