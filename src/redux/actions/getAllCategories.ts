import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllCategories = createAsyncThunk(
  'getAllCategories',
  async () => {
    try {
      const response = await axios.get(
        'https://fakestoreapi.com/products/categories'
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
