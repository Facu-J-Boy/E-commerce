import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const getCart = createAsyncThunk('getCart', async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});
