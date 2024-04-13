import { createSlice } from '@reduxjs/toolkit';
import { logIn } from '../actions/logIn';
import { signUp } from '../actions/signUp';
import { postComment } from '../actions/postComment';

export interface notificationState {
  type: string | null;
  text: null | string | undefined;
}

const initialState: notificationState = {
  type: null,
  text: null
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearNotification: (state) => {
      state.type = null;
      state.text = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.text = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.type = 'error';
        state.text = action.error.message;
      })
      .addCase(signUp.pending, (state) => {
        state.text = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.type = 'error';
        state.text = action.error.message;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        console.log('notification fulfilled: ', action);
        state.type = action.payload.notification.type;
        state.text = action.payload.notification.text;
      })
      .addCase(postComment.rejected, (state, action) => {
        console.log('notification rejected: ', action);
        // state.type = action.error.notification.type;
        // state.text = action.error.notification.text;
      });
  }
});

export const { clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
