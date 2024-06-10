import axios from "axios";
import { SERVER_URL } from "../utils/helper";

const getHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const notfiy = async (payload) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${SERVER_URL}/api/product/notify`,
      payload,
      getHeader(token)
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getAllNoti = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/product/notifications`,
      getHeader(token)
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const makeAsRead = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${SERVER_URL}/api/product/notification/${id}/mark-read`,
      {},
      getHeader(token)
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteNoti = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `${SERVER_URL}/api/product/notification/${id}/delete`,
      getHeader(token)
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteAllNoti = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `${SERVER_URL}/api/product/notification/delete/all`,
      getHeader(token)
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
