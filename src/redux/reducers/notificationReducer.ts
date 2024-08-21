import { createSlice } from '@reduxjs/toolkit';
import { logIn } from '../actions/logIn';
import { signUp } from '../actions/signUp';
import { postComment } from '../actions/postComment';
import { deleteComment } from '../actions/deleteComment';
import { createProduct } from '../actions/createProduct';
import { deleteProduct } from '../actions/deleteProduct';
import { updateProduct } from '../actions/updateProduct';
import { updateProductImage } from '../actions/updateProductImage';
import { deleteUser } from '../actions/deleteUser';
import { deleteCategory } from '../actions/deleteCategory';

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
        state.type = action.payload.notification.type;
        state.text = action.payload.notification.text;
      })
      .addCase(postComment.rejected, (action) => {
        console.log('notification rejected: ', action);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.type = action.payload.notification.type;
        state.text = action.payload.notification.text;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.type = action.payload.type;
        state.text = action.payload.text;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.type = action.payload.notification.type;
        state.text = action.payload.notification.text;
      })
      .addCase(updateProductImage.fulfilled, (state, action) => {
        state.type = action.payload.notification.type;
        state.text = action.payload.notification.text;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.type = action.payload.type;
        state.text = action.payload.text;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.type = action.payload.notification.type;
        state.text = action.payload.notification.text;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        console.log('action: ', action);
        state.type = action.payload.notification.type;
        state.text = action.payload.notification.text;
      });
  }
});

export const { clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
