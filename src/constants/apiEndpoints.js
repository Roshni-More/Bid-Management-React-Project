export const API_ENDPOINTS = {
  BIDS: "/api/GeMBids",
  DASHBOARD: "/api/GeMBids/dashboard",
  FILTERS: "/api/GeMBids/filters",
  BID_DETAIL: (bidNumber) => `/api/GeMBids/${bidNumber}`,


  // <--Export bids to Excel by Atharv-->
  BIDS_EXPORT: "/api/GeMBids/export",

  // PDF Document Viewer & Download
  BID_PDF: (bidNumber, download = false) =>
    `/api/GeMBids/pdf?bidNumber=${encodeURIComponent(bidNumber)}${download ? "&download=true" : ""}`,
};
