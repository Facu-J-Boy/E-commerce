import { createSlice } from '@reduxjs/toolkit';
import { getSearch } from '../actions/getSearch';

interface searchState {
  allSearchs: string[] | [];
}

const initialState: searchState = {
  allSearchs: []
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSearch, (state, action) => {
      state.allSearchs = action.payload && action.payload.search;
    });
  }
});

export default searchSlice.reducer;
