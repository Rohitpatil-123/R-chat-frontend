import { createSlice } from "@reduxjs/toolkit";

export const pluserSlice = createSlice({
  name: "enduser",
  initialState: {},
  reducers: {
    Assign: (state, action) => {
      state.enduser = action.payload;
    },
  },
});

export const { Assign } = pluserSlice.actions;

export default pluserSlice.reducer;
