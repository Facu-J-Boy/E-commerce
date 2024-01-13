import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsReducer';
import singleProductReducer from './reducers/singleProductReducer';
import categoriesReducer from './reducers/categoriesReducer';
import commentsSlice from './reducers/commentsReducer';
import cartReducer from './reducers/cartReducer';
import productsByCategorySlice from './reducers/productsByCategoryReducer';
import historyReducer from './reducers/historyReducer';
import searchReducer from './reducers/searchReducer';
import buyReducer from './reducers/buyReducer';

const store = configureStore({
  reducer: {
    products: productsReducer,
    product: singleProductReducer,
    categories: categoriesReducer,
    comments: commentsSlice,
    cartProducts: cartReducer,
    searchs: searchReducer,
    productsByCategory: productsByCategorySlice,
    historyProducts: historyReducer,
    buy: buyReducer
  }
});

export default store;

export type AppDispatch = typeof store.dispatch;
