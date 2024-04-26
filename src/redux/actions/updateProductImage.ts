import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';

export const updateProductImage = createAsyncThunk(
  'updateProductImage',
  async (data: { id: string | undefined; image: File | undefined }) => {
    const formData = new FormData();
    data.image && formData.append('image', data.image);
    try {
      const response = await axiosInstance.put(
        `/product/updateImage/${data.id}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
