import axiosInstance, { API_URL } from "./axiosInstance";
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

// <--Export bids to Excel by Atharv-->
export const exportBids = async (filters) => {
    const response = await axiosInstance.get(
        API_ENDPOINTS.BIDS_EXPORT,
        {
            params: filters,
            responseType: "blob",
        }
    );

    return response;
};

// Returns direct URL to stream or download PDF from proxy endpoint
export const getBidPdfUrl = (bidNumber, download = false) => {
  return `${API_URL}${API_ENDPOINTS.BID_PDF(bidNumber, download)}`;
};

// Fetches PDF as blob for direct download or in-app preview
export const fetchBidPdfBlob = async (bidNumber) => {
  const response = await axiosInstance.get(API_ENDPOINTS.BID_PDF(bidNumber), {
    responseType: "blob",
  });
  return response.data;
};
