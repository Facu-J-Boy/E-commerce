import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getInCategory = createAsyncThunk(
  'getInCategory',
  async (category) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
