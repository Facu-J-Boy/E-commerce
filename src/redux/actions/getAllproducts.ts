import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';
import { productsState } from '../reducers/productsReducer';

export const getAllProducts = createAsyncThunk(
  'getAllProducts',
  async (data: { page: number; title: string }) => {
    const params = { page: data.page, title: data.title, limit: 15 };
    try {
      const response = await axiosInstance.get('/product', { params });

      const products: productsState = {
        title: response.data.title,
        products: response.data.products,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        message: response.data.message,
        productsError: null
      };

      return { payload: products };
    } catch (error: any) {
      throw error.response.data;
    }
  }
);
