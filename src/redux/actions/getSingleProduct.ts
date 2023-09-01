import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSingleProduct = createAsyncThunk(
  'getSingleProduct',
  async (id: string) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
