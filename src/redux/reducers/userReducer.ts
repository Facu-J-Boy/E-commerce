import { createSlice } from '@reduxjs/toolkit';
import { user } from '../../interfaces/user';
import { getSession } from '../actions/getSession';
import { logOut } from '../actions/logOut';
import { logIn } from '../actions/logIn';

export interface userState {
  user: user | {};
  userLoading: boolean;
  error: null | string | undefined;
}

const initialState: userState = {
  user: {},
  userLoading: false,
  error: null
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
        state.user = action.payload;
      })
      .addCase(logIn.pending, (state) => {
        state.userLoading = true;
      })
      // .addCase(logIn.fulfilled, (state, action) => {
      //   state.userLoading = false;
      //   state.user = action.payload;
      // })
      .addCase(logIn.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.error.message;
      })
      .addCase(logOut, (state, action) => {
        state.user = action.payload;
      });
  }
});

export default userSlice.reducer;
