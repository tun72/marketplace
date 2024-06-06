import axios from "axios";
import { SERVER_URL } from "../utils/helper";

export const getPublicProducts = async () => {
  const response = await axios.get(`${SERVER_URL}/api/public/products`);

  console.log(response);
  if (response.status !== 200) {
    throw new Error("Something Went Wrong");
  }

  return response.data;
};
