import { configureStore } from '@reduxjs/toolkit';
import userReducer, { userState } from './reducers/userReducer';
import productsReducer, { productsState } from './reducers/productsReducer';
import singleProductReducer, {
  productState
} from './reducers/singleProductReducer';
import categoriesReducer, {
  categoriesState
} from './reducers/categoriesReducer';
import commentsSlice, { commentsState } from './reducers/commentsReducer';
import cartReducer, { cartState } from './reducers/cartReducer';
import productsByCategorySlice, {
  productsByCategoryState
} from './reducers/productsByCategoryReducer';
import historyReducer, { historyState } from './reducers/historyReducer';
import searchReducer, { searchState } from './reducers/searchReducer';
import notificationReducer, {
  notificationState
} from './reducers/notificationReducer';

export interface storeInterface {
  user: userState;
  products: productsState;
  product: productState;
  categories: categoriesState;
  comments: commentsState;
  cartProducts: cartState;
  searchs: searchState;
  productsByCategory: productsByCategoryState;
  historyProducts: historyState;
  notification: notificationState;
}

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    product: singleProductReducer,
    categories: categoriesReducer,
    comments: commentsSlice,
    cartProducts: cartReducer,
    searchs: searchReducer,
    productsByCategory: productsByCategorySlice,
    historyProducts: historyReducer,
    notification: notificationReducer
  }
});

export default store;

export type AppDispatch = typeof store.dispatch;
