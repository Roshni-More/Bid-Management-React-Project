import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import filterReducer from "../features/filters/filterSlice";
import bidReducer from "../features/bids/bidSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    filters: filterReducer,
    bids: bidReducer,
  },
});
