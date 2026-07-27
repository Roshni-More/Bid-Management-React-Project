export const selectBidList = (state) => state.bids.items;
export const selectBidListLoading = (state) => state.bids.listLoading;
export const selectBidListError = (state) => state.bids.listError;
export const selectBidPagination = (state) => ({
  pageNumber: state.bids.pageNumber,
  pageSize: state.bids.pageSize,
  totalPages: state.bids.totalPages,
  totalRecords: state.bids.totalRecords,
});
export const selectSelectedBid = (state) => state.bids.selectedBid;
export const selectBidDetailLoading = (state) => state.bids.detailLoading;
export const selectBidDetailError = (state) => state.bids.detailError;
