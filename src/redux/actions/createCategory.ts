import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const createCategory = createAsyncThunk(
  'createCategory',
  async (name: string) => {
    try {
      const response = await axiosInstance.post('/category/create', { name });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);
