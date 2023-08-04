import { createSlice } from "@reduxjs/toolkit";

export const upuserSlice = createSlice({
  name: "enduser",
  initialState: null,
  reducers: {
    selected: (state, action) => {
      return action.payload;
    },
  },
});

export const { selected } = upuserSlice.actions;

export default upuserSlice.reducer;
