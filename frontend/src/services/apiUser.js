import axios from "axios";
import { SERVER_URL } from "../utils/helper";

const getHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

export async function login({ email, password }) {
  const response = await axios.post(`${SERVER_URL}/api/auth/login`, {
    email,
    password,
  });

  if (response.status !== 200) {
    throw new Error(response);
  }

  const data = response.data;
  localStorage.setItem("token", data.token);

  return data;
}
export async function register({ email, password, name }) {
  const response = await axios.post(`${SERVER_URL}/api/auth/register`, {
    email,
    password,
    name,
  });

  if (response.status !== 200) {
    throw new Error(response);
  }

  const data = response.data;

  return data;
}

export async function checkUser() {
  const token = localStorage.getItem("token")
  console.log(token);
  const response = await axios.get(`${SERVER_URL}/api/auth/check-user`, getHeader(token));

  console.log(response);

  if (response.status !== 200) {
    throw new Error(response);
  }

  const data = response.data;

  return data;
}