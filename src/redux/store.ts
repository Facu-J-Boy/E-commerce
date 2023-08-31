import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsReducer";
const store = configureStore({
    reducer:{
        products: productsReducer,
    }
});

export default store;

export type AppDispatch = typeof store.dispatch;