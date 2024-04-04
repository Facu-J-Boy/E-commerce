import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSession = createAsyncThunk(
  'getSession',
  async (id: string | undefined) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/user/session/${id}`
      );
      console.log('session: ', response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
