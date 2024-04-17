import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const deleteToTheCart = createAsyncThunk(
  'deleteToTheCart',
  async (data: { userId: string; productId: string }) => {
    try {
      const response = await axiosInstance.delete(
        `/cart/remove/${data.userId}/${data.productId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
