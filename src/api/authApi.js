import axiosInstance from "./axiosInstance";

export const loginUser = async (loginData) => {
  const response = await axiosInstance.post(
    "/api/Auth/login",
    loginData
  );

  return response.data;
};