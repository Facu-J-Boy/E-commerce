import { createSlice } from '@reduxjs/toolkit';
import { user } from '../../interfaces/user';
import { getSession } from '../actions/getSession';
import { logOut } from '../actions/logOut';
import { logIn } from '../actions/logIn';
import { signUp } from '../actions/signUp';

export interface userState {
  user: user | {};
  userLoading: boolean;
  userError: null | string | undefined;
}

const initialState: userState = {
  user: {},
  userLoading: false,
  userError: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.userError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSession.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload;
      })
      .addCase(logIn.pending, (state) => {
        state.userError = null;
        state.userLoading = true;
      })
      .addCase(logIn.fulfilled, (state) => {
        state.userLoading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.error.message;
      })
      .addCase(signUp.pending, (state) => {
        state.userError = null;
        state.userLoading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.userLoading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.error.message;
      })
      .addCase(logOut, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const { clearUserError } = userSlice.actions;

export default userSlice.reducer;
