import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const apiLikeUser = async (userId) =>
  axios.patch(`${BASE_URL}/user/like/${userId}`);

export const apiDislikeUser = async (userId) =>
  axios.patch(`${BASE_URL}/user/dislike/${userId}`);
