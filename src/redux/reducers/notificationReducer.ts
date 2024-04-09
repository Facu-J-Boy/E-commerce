import { createSlice } from '@reduxjs/toolkit';
import { logIn } from '../actions/logIn';
import { signUp } from '../actions/signUp';

export interface notificationState {
  text: null | string | undefined;
}

const initialState: notificationState = {
  text: null
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearNotification: (state) => {
      state.text = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.text = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.text = action.error.message;
      })
      .addCase(signUp.pending, (state) => {
        state.text = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.text = action.error.message;
      });
  }
});

export const { clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
