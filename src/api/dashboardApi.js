import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

// Returns DashboardDto directly — no wrapper
export const fetchDashboardStats = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.DASHBOARD);

  console.log(response);

  return response.data;
};
