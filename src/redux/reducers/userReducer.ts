import { createSlice } from '@reduxjs/toolkit';
import { user } from '../../interfaces/user';
import { getSession } from '../actions/getSession';
import { logIn } from '../actions/logIn';
import { signUp } from '../actions/signUp';
import { deleteUser } from '../actions/deleteUser';
import { userId } from '../actions/userId';

export interface userState {
  User: user | null;
  userLoading: boolean;
}

const initialState: userState = {
  User: null,
  userLoading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.User = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSession.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.userLoading = false;
        state.User = action.payload;
      })
      .addCase(logIn.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(logIn.fulfilled, (state) => {
        state.userLoading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.userLoading = false;
      })
      .addCase(signUp.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.userLoading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.userLoading = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        if (action.payload.deletedUserId) {
          userId.set('');
          state.User = null;
        }
      });
  }
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
