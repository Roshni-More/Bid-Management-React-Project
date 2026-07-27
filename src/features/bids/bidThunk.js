import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBidList, fetchBidDetail } from "../../api/bidApi";
import { syncOptionsFromBidResponse } from "../filters/filterSlice";

export const loadBidList = createAsyncThunk(
  "bids/loadList",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const result = await fetchBidList(state.filters.selected);
      // Bid list response includes an updated FilterDto — keep dropdown counts in sync
      if (result.filters) {
        dispatch(syncOptionsFromBidResponse(result.filters));
      }
      return result;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load bids",
      );
    }
  },
);

export const loadBidDetail = createAsyncThunk(
  "bids/loadDetail",
  async (bidNumber, { rejectWithValue }) => {
    try {
      return await fetchBidDetail(bidNumber);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load bid detail",
      );
    }
  },
);
