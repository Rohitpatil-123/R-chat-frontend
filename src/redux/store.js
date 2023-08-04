import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userslice.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./services/userApi.js";
import upuserSlice from "./slices/upuserslice.js";
import pluserSlice from "./slices/pluserslice.js";

export const store = configureStore({
  reducer: {
    user: userSlice,
    upuser: upuserSlice,
    pluser: pluserSlice,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);
