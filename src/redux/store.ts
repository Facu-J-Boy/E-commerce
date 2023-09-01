import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsReducer';
import singleProduct from './reducers/singleProduct';
const store = configureStore({
  reducer: {
    products: productsReducer,
    product: singleProduct
  }
});

export default store;

export type AppDispatch = typeof store.dispatch;
