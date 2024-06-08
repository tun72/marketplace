import axios from "axios";
import { SERVER_URL } from "../utils/helper";

const getFreshLocalStorage = () => {
  const refreshToken = localStorage.getItem("token");
  return refreshToken;
};

export const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getFreshLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);