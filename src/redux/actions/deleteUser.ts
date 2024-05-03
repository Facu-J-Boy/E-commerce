import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const deleteUser = createAsyncThunk('deleteUser', async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/user/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
