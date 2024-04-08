import { createAsyncThunk } from '@reduxjs/toolkit';
import { FormData } from '../../interfaces/formData';
import axios, { AxiosRequestConfig } from 'axios';
import { userId } from './userId';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:3001', // URL base para todas las solicitudes
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  }
};

const axiosInstance = axios.create(axiosRequestConfig);

export const signUp = createAsyncThunk('signUp', async (formData: FormData) => {
  const data = {
    email: formData.email,
    password: formData.password
  };
  try {
    const response = await axiosInstance.post('/user/signup', data);
    response && userId.set(response.data._id);
    window.open('http://localhost:3000', '_self');
  } catch (error: any) {
    throw error.response.data.error;
  }
});
