import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

// Accepts the same filter query params as /api/GeMBids for cascading dropdowns.
// Returns FilterDto directly — no wrapper.
export const fetchFilterOptions = async (params = {}) => {
  const response = await axiosInstance.get(API_ENDPOINTS.FILTERS, { params });
  return response.data;
};
