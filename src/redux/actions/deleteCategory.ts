import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const deleteCategory = createAsyncThunk(
  'deleteCategory',
  async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/category/delete/${id}`);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);
