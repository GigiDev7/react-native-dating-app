import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const usersSlice = createSlice({
  name: "users",
  initialState: { users: [], error: null },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const usersActions = usersSlice.actions;

export const getUsers =
  (maxDistance, gender, minAge, maxAge) => async (dispatch) => {
    try {
      const url = new URL(`${BASE_URL}/user`);
      if (minAge) url.searchParams.append("minAge", minAge);
      if (maxAge) url.searchParams.append("maxAge", maxAge);
      if (gender) url.searchParams.append("gender", gender);
      if (maxDistance) url.searchParams.append("maxDistance", maxDistance);
      const { data } = await axios.get(url.href);
      dispatch(usersActions.setUsers(data));
    } catch (error) {
      console.log(error);
    }
  };
