import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsReducer';
import singleProductReducer from './reducers/singleProductReducer';
import categoriesReducer from './reducers/categoriesReducer';
import commentsSlice from './reducers/commentsReducer';
import cartReducer from './reducers/cartReducer';
import productsByCategorySlice from './reducers/productsByCategoryReducer';
import historyReducer from './reducers/historyReducer';
const store = configureStore({
  reducer: {
    products: productsReducer,
    product: singleProductReducer,
    categories: categoriesReducer,
    comments: commentsSlice,
    cartProducts: cartReducer,
    productsByCategory: productsByCategorySlice,
    historyProducts: historyReducer
  }
});

export default store;

export type AppDispatch = typeof store.dispatch;
