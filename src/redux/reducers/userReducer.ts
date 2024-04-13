import { createSlice } from '@reduxjs/toolkit';
import { user } from '../../interfaces/user';
import { getSession } from '../actions/getSession';
import { logOut } from '../actions/logOut';
import { logIn } from '../actions/logIn';
import { signUp } from '../actions/signUp';

export interface userState {
  User: user | {};
  userLoading: boolean;
}

const initialState: userState = {
  User: {},
  userLoading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
      .addCase(logOut, (state, action) => {
        state.User = action.payload;
      });
  }
});

export default userSlice.reducer;
