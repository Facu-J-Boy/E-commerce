import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const deleteComment = createAsyncThunk(
  'deleteComment',
  async (id: string | undefined) => {
    try {
      const response = await axiosInstance.delete(`/review/delete/${id}`);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);
