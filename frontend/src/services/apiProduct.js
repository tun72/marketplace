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

export async function addProduct(product) {
  console.log(product);
  const token = localStorage.getItem("token");
  console.log(token);

  const response = await axios.post(
    `${SERVER_URL}/api/product`,
    product,
    getHeader(token)
  );

  if (response.status !== 201) {
    throw new Error(response);
  }

  console.log(response);
  const data = response.data;
  console.log(data);

  return data;
}
