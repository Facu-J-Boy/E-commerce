import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const getAllcategory = createAsyncThunk('getAllcategory', async () => {
  try {
    const response = await axiosInstance.get('/category');
    console.log('category: ', response.data);
  } catch (error) {
    console.error(error);
  }
});
