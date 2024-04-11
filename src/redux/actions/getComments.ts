import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const getComments = createAsyncThunk(
  'getComments',
  async (id: string | undefined) => {
    try {
      const response = await axiosInstance.get(`/review/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
