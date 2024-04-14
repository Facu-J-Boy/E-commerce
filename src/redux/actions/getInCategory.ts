import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const getInCategory = createAsyncThunk(
  'getInCategory',
  async (categoryId: string | undefined) => {
    try {
      const response = await axiosInstance.get(
        `/product/category/${categoryId}`
      );
      console.log('response: ', response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
