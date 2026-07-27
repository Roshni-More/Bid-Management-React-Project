import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboardStats } from "../../api/dashboardApi";

const initialState = {
  stats: null,
  loading: false,
  error: null,
};

export const loadDashboardStats = createAsyncThunk(
  "dashboard/loadStats",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchDashboardStats();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load dashboard stats",
      );
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadDashboardStats.fulfilled, (state, action) => {
        console.log("Dashboard Payload", action.payload);

        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(loadDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
