import { createSlice } from "@reduxjs/toolkit";
import { loadBidList, loadBidDetail } from "./bidThunk";

const initialState = {
  items: [],
  totalRecords: 0,
  totalPages: 0,
  pageNumber: 1,
  pageSize: 10,
  listLoading: false,
  listError: null,

  selectedBid: null,
  detailLoading: false,
  detailError: null,
};

const bidSlice = createSlice({
  name: "bids",
  initialState,
  reducers: {
    clearSelectedBid: (state) => {
      state.selectedBid = null;
      state.detailError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBidList.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(loadBidList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.items = action.payload.data || [];
        state.totalRecords = action.payload.totalRecords;
        state.totalPages = action.payload.totalPages;
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(loadBidList.rejected, (state, action) => {
        state.listLoading = false;
        state.listError = action.payload;
      })

      .addCase(loadBidDetail.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(loadBidDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedBid = action.payload;
      })
      .addCase(loadBidDetail.rejected, (state, action) => {
        console.log("Bid Payload", action.payload);
        state.detailLoading = false;
        state.detailError = action.payload;
      });
  },
});

export const { clearSelectedBid } = bidSlice.actions;
export default bidSlice.reducer;
