import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/product/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
