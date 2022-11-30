import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useJwt } from "react-jwt";
import { handleError } from "../utils/error";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, error: null, timer: null },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      state.timer = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setAuthError(state, action) {
      state.error = action.payload;
    },
    setTimer(state, action) {
      state.timer = action.payload;
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
    const currentDate = new Date().getTime();
    const expiresAt = currentDate + 2 * 60 * 60 * 1000;

    const timer = setTimeout(() => {
      dispatch(authActions.logout());
    }, 2 * 60 * 60 * 1000);
    dispatch(authActions.setTimer(timer));

    await AsyncStorage.setItem("expiresAt", expiresAt.toString());
    await AsyncStorage.setItem("user", JSON.stringify(data));
    dispatch(authActions.login(data));
  } catch (error) {
    const errorMessage = handleError(error);
    dispatch(authActions.setAuthError(errorMessage));
  }
};

export const registerUser = async (userData) => {
  try {
    await axios.post(`${BASE_URL}/user/register`, userData);
  } catch (error) {
    const errorMessage = handleError(error);
    dispatch(authActions.setAuthError(errorMessage));
  }
};

export const logoutUser = () => async (dispatch) => {
  await AsyncStorage.removeItem("user");
  await AsyncStorage.removeItem("expiresAt");
  dispatch(authActions.logout());
};

export const updateLocation =
  (userId, longitude, latitude, city, country) => async (dispatch) => {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/user/location/${userId}`,
        {
          latitude,
          longitude,
          city,
          country,
        }
      );
      await AsyncStorage.setItem("user", JSON.stringify(data));
      dispatch(authActions.setUser(data));
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

export default authSlice;
