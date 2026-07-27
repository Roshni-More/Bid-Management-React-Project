import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFilterOptions } from "../../api/filterApi";

// Accepts an optional partial filter object so cascading dropdowns
// (Ministry -> Department -> Organisation -> Office, Category -> SubCategory)
// can re-fetch scoped options from the real /filters API.
export const loadFilterOptions = createAsyncThunk(
  "filters/loadOptions",
  async (partialFilters = {}, { rejectWithValue }) => {
    try {
      return await fetchFilterOptions(partialFilters);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load filters",
      );
    }
  },
);
