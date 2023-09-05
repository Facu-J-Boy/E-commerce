import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsReducer';
import singleProductReducer from './reducers/singleProductReducer';
import categoriesReducer from './reducers/categoriesReducer';
const store = configureStore({
  reducer: {
    products: productsReducer,
    product: singleProductReducer,
    categories: categoriesReducer
  }
});

export default store;

export type AppDispatch = typeof store.dispatch;
