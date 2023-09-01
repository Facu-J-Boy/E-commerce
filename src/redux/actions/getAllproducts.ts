import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
