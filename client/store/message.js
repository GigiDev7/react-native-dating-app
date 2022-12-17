import { createSlice } from "@reduxjs/toolkit";

export const messageBoxSlice = createSlice({
  name: "messageBox",
  initialState: { messageBox: null },
  reducers: {
    setMessageBox(state, action) {
      state.messageBox = action.payload;
    },
  },
});

export const messageBoxActions = messageBoxSlice.actions;
