import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsReducer';
import singleProductReducer from './reducers/singleProductReducer';
import categoriesReducer from './reducers/categoriesReducer';
import commentsSlice from './reducers/commentsReducer';
import cartReducer from './reducers/cartReducer';
import productsByCategoryReducer from './reducers/productsByCategoryReducer';
const store = configureStore({
  reducer: {
    products: productsReducer,
    product: singleProductReducer,
    categories: categoriesReducer,
    comments: commentsSlice,
    cartProducts: cartReducer,
    productsByCategory: productsByCategoryReducer
  }
});

export default store;

export type AppDispatch = typeof store.dispatch;
