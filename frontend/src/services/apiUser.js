import axios from "axios";
import { SERVER_URL } from "../utils/helper";
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
