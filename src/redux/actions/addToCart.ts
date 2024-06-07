import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const addToCart = createAsyncThunk(
  'addToCart',
  async (data: { userId: string | undefined; productId: string }) => {
    try {
      const response = await axiosInstance.post('/cart', data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
