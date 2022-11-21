import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, error: null },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    setAuthError(state, action) {
      state.error = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/login`, {
      email,
      password,
    });
    dispatch(authActions.login(data));
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (userData) => {
  try {
    await axios.post(`${BASE_URL}/user/register`, userData);
  } catch (error) {
    console.log(error);
  }
};

export default authSlice;
