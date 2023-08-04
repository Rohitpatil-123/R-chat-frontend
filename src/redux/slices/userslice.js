import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    Authenticated: (state, action) => {
      state.user = action.payload;
    },
    Unauthenticated: (state, action) => {
      state.active = null;
    },
  },
});

export const { Authenticated, Unauthenticated } = userSlice.actions;

export default userSlice.reducer;
