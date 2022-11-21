import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isExpired } from "react-jwt";
import { useDispatch } from "react-redux";

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
    setUser(state, action) {
      state.user = action.payload;
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
    await AsyncStorage.setItem("user", JSON.stringify(data));
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

export const logoutUser = () => async (dispatch) => {
  await AsyncStorage.removeItem("user");
  dispatch(authActions.logout());
};

axios.interceptors.request.use(async function (config) {
  const user = await AsyncStorage.getItem("user");
  const dispatch = useDispatch();

  if (user) {
    const isTokenExpired = isExpired(JSON.parse(user).token);
    if (isTokenExpired) {
      dispatch(logoutUser());
      return;
    }
  }
});

export default authSlice;
