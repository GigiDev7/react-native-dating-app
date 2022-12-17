import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import { usersSlice } from "./users";
import { messageBoxSlice } from "./message";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    message: messageBoxSlice.reducer,
  },
});

export default store;
