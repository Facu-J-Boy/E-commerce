import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { productsState } from '../reducers/productsReducer';

export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');

    const products: productsState = {
      products: response.data,
      productsError: null
    };

    return { payload: products };
  } catch (error) {
    const productsError: productsState = {
      products: [],
      productsError: {
        type: 'fetch',
        text: 'Network Error'
      }
    };

    return { payload: productsError };
  }
});
