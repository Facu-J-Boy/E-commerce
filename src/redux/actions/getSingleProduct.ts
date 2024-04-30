import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const getSingleProduct = createAsyncThunk(
  'getSingleProduct',
  async (id: string | undefined) => {
    try {
      const response = await axiosInstance.get(`/product/${id}`);
      console.log('product: ', response.data);
      return response.data;
    } catch (error: any) {
      console.error(error);
      return error.response.data;
    }
  }
);
