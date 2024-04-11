import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const getSingleProduct = createAsyncThunk(
  'getSingleProduct',
  async (id: string | undefined) => {
    try {
      const response = await axiosInstance.get(`/product/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
