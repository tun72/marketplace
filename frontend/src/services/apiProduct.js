import axios from "axios";
import { SERVER_URL } from "../utils/helper";

const getHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export async function addProduct(product) {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${SERVER_URL}/api/product`,
    product,
    getHeader(token)
  );

  if (response.status !== 201) {
    throw new Error(response);
  }

  return response.data;
}

export async function updateProduct(id, product) {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `${SERVER_URL}/api/product/${id}/update`,
    product,
    getHeader(token)
  );

  if (response.status !== 200) {
    throw new Error(response);
  }

  console.log(response);
  const data = response.data;
  console.log(data);

  return data;
}

export async function getProducts() {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${SERVER_URL}/api/product`,
    getHeader(token)
  );

  if (response.status !== 200) {
    throw new Error(response);
  }
  const data = response.data;
  return data;
}

export async function getOldProduct(id) {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${SERVER_URL}/api/product/${id}/old-data`,
    getHeader(token)
  );

  if (response.status !== 200) {
    throw new Error(response);
  }
  const data = response.data;
  return data;
}

export async function deleteProduct(id) {
  const token = localStorage.getItem("token");
  const response = await axios.delete(
    `${SERVER_URL}/api/product/${id}/delete`,
    getHeader(token)
  );

  if (response.status !== 202) {
    throw new Error(response);
  }
  const data = response.data;
  return data;
}

export async function getImages(id) {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${SERVER_URL}/api/product/${id}/images`,
    getHeader(token)
  );
  if (response.status !== 200) {
    throw new Error(response);
  }
  const data = response.data;
  return data;
}

export async function uploadImages(images, productId) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${SERVER_URL}/api/product/${productId}/images`,
    images,
    getHeader(token),
    {
      validateStatus: () => true,
    }
  );

  if (response.status !== 200) {
    throw new Error(200);
  }

  const data = response.data;

  return data;
}

// bid

export async function getBids(id) {
  const response = await axios.get(`${SERVER_URL}/api/product/bids/${id}`);

  if (response.status !== 200) {
    throw new Error(200);
  }

  const data = response.data;

  return data;
}

export async function placeABid(bid) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${SERVER_URL}/api/product/place-bids`,
    bid,
    getHeader(token)
  );

  if (response.status !== 201) {
    throw new Error(200);
  }

  const data = response.data;

  return data;
}
