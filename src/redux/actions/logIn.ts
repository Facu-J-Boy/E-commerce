import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Config/axios';
import { FormData } from '../../interfaces/formData';
import { userId } from './userId';

export const logIn = createAsyncThunk('logIn', async (formData: FormData) => {
  const data = {
    email: formData.email,
    password: formData.password
  };
  console.log('date: ', data);
  try {
    const response = await axiosInstance.post('/user/login', data);
    response && userId.set(response.data._id);
    window.open(`${process.env.REACT_APP_CLIENT_URL}`, '_self');
  } catch (error: any) {
    throw error.response.data.error;
  }
});
