import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const config = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  }
};

export const getAllcategory = createAsyncThunk('getAllcategory', async () => {
  try {
    const response = await axios.get('http://localhost:3001/category', config);
    console.log('category: ', response.data);
  } catch (error) {
    console.error(error);
  }
});
