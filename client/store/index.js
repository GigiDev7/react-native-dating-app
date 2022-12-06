import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import { usersSlice } from "./users";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
  },
});

export default store;
