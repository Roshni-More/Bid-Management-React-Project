import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

// Returns PagedResponseDto { pageNumber, pageSize, totalRecords, totalPages, data, filters }
export const fetchBidList = async (filters) => {
  const response = await axiosInstance.get(API_ENDPOINTS.BIDS, {
    params: filters,
  });
  return response.data;
};

// bidNumber may contain slashes (e.g. GEM/2024/B/1234567) — backend uses a catch-all route,
// so we pass it through untouched (no encodeURIComponent, which would break the slashes).
export const fetchBidDetail = async (bidNumber) => {
  const response = await axiosInstance.get(API_ENDPOINTS.BID_DETAIL(bidNumber));
  return response.data;
};
