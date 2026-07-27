export const API_ENDPOINTS = {
  BIDS: "/api/GeMBids",
  DASHBOARD: "/api/GeMBids/dashboard",
  FILTERS: "/api/GeMBids/filters",
  BID_DETAIL: (bidNumber) => `/api/GeMBids/${bidNumber}`,
};
