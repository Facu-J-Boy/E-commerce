import { createSlice } from '@reduxjs/toolkit';
import { getCart } from '../actions/getCart';
import { addToCart } from '../actions/addToCart';
import { deleteToTheCart } from '../actions/deleteToTheCart';
import { deleteProduct } from '../actions/deleteProduct';

interface product {
  _id: string;
  title: string;
  image: string;
  price: number;
}

interface cartState {
  cartLoading: boolean;
  adding: boolean;
  deleting: boolean;
  cartProducts: product[] | [];
  total: string;
  message: string;
}

const initialState: cartState = {
  cartLoading: false,
  adding: true,
  deleting: false,
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
        state.cartProducts = action.payload ? action.payload.products : [];
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
        state.adding = false;
        state.cartProducts = action.payload.products;
        state.total = action.payload.total;
        state.message = action.payload.message;
      })
      .addCase(addToCart.rejected, (state) => {
        state.adding = false;
      })
      .addCase(deleteToTheCart.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deleteToTheCart.fulfilled, (state, action) => {
        state.deleting = false;
        state.cartProducts = action.payload.products;
        state.total = action.payload.total;
        state.message = action.payload.message;
      })
      .addCase(deleteToTheCart.rejected, (state) => {
        state.deleting = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.cartProducts = state.cartProducts.filter(
          (product: product) =>
            product._id !== action.payload.productDeleted?._id
        );
      });
  }
});

export default cartSlice.reducer;
