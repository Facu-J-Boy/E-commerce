import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { categoriesState } from '../reducers/categoriesReducer';

export const getAllCategories = createAsyncThunk(
  'getAllCategories',
  async () => {
    try {
      const response = await axios.get(
        'https://fakestoreapi.com/products/categories'
      );

      const categories: categoriesState = {
        categories: response.data,
        categoriesError: null
      };
      return { payload: categories };
    } catch (error) {
      const categoriesError: categoriesState = {
        categories: [],
        categoriesError: {
          type: 'fetch',
          text: 'Network Error'
        }
      };
      return { payload: categoriesError };
    }
  }
);
