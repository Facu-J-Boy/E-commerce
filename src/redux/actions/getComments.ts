import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const getComments = createAsyncThunk(
  'getComments',
  async (data: { id: string | undefined; page: number | null | undefined }) => {
    const params = { page: data.page };
    try {
      const response = await axiosInstance.get(`/review/${data.id}`, {
        params
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
