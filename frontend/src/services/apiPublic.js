import axios from "axios";
import { SERVER_URL } from "../utils/helper";

export const getPublicProducts = async (page=1, search="", category="") => {
  const response = await axios.get(
    `${SERVER_URL}/api/public/products?page=${page}&searchKey=${search}&category=${category}`
  );

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
};

export const getProductDetail = async (id) => {
  const response = await axios.get(`${SERVER_URL}/api/public/product/${id}`);

  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
};
