import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const editCategory = createAsyncThunk(
  'editCategory',
  async (data: { id: string; name: string }) => {
    try {
      const { id, name } = data;
      const response = await axiosInstance.put(`/category/update/${id}`, {
        name
      });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);
