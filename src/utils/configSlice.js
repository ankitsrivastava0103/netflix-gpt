import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    language: "english",
  },
  reducers: {
    changelanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { changelanguage } = configSlice.actions;

export default configSlice.reducer;
