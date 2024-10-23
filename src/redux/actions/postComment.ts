import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const postComment = createAsyncThunk(
  'postComment',
  async (data: {
    productId: string | undefined;
    userId: string | null;
    text: string;
    rating: number;
  }) => {
    const datas = { userId: data.userId, text: data.text, rating: data.rating };
    try {
      const response = await axiosInstance.post(
        `/review/new/${data.productId}`,
        datas
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);
