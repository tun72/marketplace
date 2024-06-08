import { axiosInstance } from "./axiosInstance";

export const getAllProducts = async (page) => {
  const response = await axiosInstance.get(`/api/admin/products?page=${page}`, {
    validateStatus: () => true,
  });

  if (response.status !== 200) {
    throw new Error(`Error got status ${response.status}`);
  }
  return response.data;
};

export const manageProducts = async (id, key) => {
  const response = await axiosInstance.post(
    `/api/admin/products/${id}/manage`,
    { key },
    {
      validateStatus: () => true,
    }
  );

  if (response.status !== 200) {
    throw new Error(`Error got status ${response.status}`);
  }
  return response.data;
};

export const getAllUsers = async (page) => {
  const response = await axiosInstance.get(`/api/admin/users?page=${page}`, {
    validateStatus: () => true,
  });

  if (response.status !== 200) {
    throw new Error(`Error got status ${response.status}`);
  }
  return response.data;
};

export const banUser = async (id) => {
  const response = await axiosInstance.post(`/api/admin/users/${id}/ban`, {
    validateStatus: () => true,
  });

  if (response.status !== 200) {
    throw new Error(`Error got status ${response.status}`);
  }
  return response.data;
};

export const unbanUser = async (id) => {
  const response = await axiosInstance.post(`/api/admin/users/${id}/unban`, {
    validateStatus: () => true,
  });

  if (response.status !== 200) {
    throw new Error(`Error got status ${response.status}`);
  }
  return response.data;
};
